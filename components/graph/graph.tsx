"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowUpRight,
  Pause,
  Play,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------- utils ----------
const fmt = (n: number, d = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString(undefined, {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      })
    : "0.00";
const gaussian = () => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

// ---------- types ----------
type Tick = { t: number; price: number };

type Position = {
  id: string;
  side: "long" | "short";
  key: "up" | "down"; // slope at open
  entry: number;
  qty: number; // in coin
  size: number; // notional in USDT
  leverage: number;
  feePaid: number;
  time: number;
};

type ClosedTrade = {
  id: string;
  side: "long" | "short";
  entry: number;
  exit: number;
  size: number;
  pnl: number;
  fee: number;
  timeOpen: number;
  timeClose: number;
};

// ---------- price feed ----------
function usePriceFeed({
  start = 30000,
  points = 240,
  intervalMs = 700,
  bias = 0.0003,
  vol = 0.008,
  running = true,
}: {
  start?: number;
  points?: number;
  intervalMs?: number;
  bias?: number;
  vol?: number;
  running?: boolean;
}) {
  const [data, setData] = useState<Tick[]>(() => {
    const now = Date.now();
    return Array.from({ length: points }, (_, i) => ({
      t: now - (points - i) * intervalMs,
      price: start,
    }));
  });
  const [price, setPrice] = useState(start);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const g = gaussian();
      const season = Math.sin(Date.now() / 4000) * 0.002;
      let next = price * (1 + bias + vol * g + season);
      if (next < 100) next = price * 0.99;
      const tick = { t: Date.now(), price: next };
      setPrice(next);
      setData((prev) => {
        const arr = prev.concat(tick);
        if (arr.length > points) arr.shift();
        return arr;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [price, bias, vol, running, points, intervalMs]);

  return { data, price, setPrice, setData } as const;
}

// ---------- tooltip ----------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-xs text-zinc-200 shadow-lg">
      <div className="font-medium">{new Date(p.t).toLocaleTimeString()}</div>
      <div className="opacity-80">
        Price: <span className="font-semibold">${fmt(p.price, 2)}</span>
      </div>
    </div>
  );
};

// ---------- component ----------
export default function BybitStyleTradingSimulator() {
  const [running, setRunning] = useState(true);
  const { data, price, setPrice, setData } = usePriceFeed({ running });

  type Run = { key: "up" | "down"; pts: Tick[] };

  const perSecond: Tick[] = useMemo(() => {
    const bySec = new Map<number, Tick>();
    for (const d of data) {
      const sec = Math.floor(d.t / 1000);
      bySec.set(sec, d); // keep the last tick in that second
    }
    return Array.from(bySec.keys())
      .sort((a, b) => a - b)
      .map((sec) => bySec.get(sec)!);
  }, [data]);

  const series: Tick[] = useMemo(() => data, [data]);

  const runs: Run[] = useMemo(() => {
    if (series.length < 2) return [];
    const out: Run[] = [];
    let prev = series[0].price;
    let curr: Run = { key: "up", pts: [series[0]] };

    for (let i = 1; i < series.length; i++) {
      const pt = series[i];
      const key: "up" | "down" = pt.price >= prev ? "up" : "down";
      if (key !== curr.key) {
        // join the boundary to avoid visual gaps
        curr.pts.push(series[i - 1]);
        if (curr.pts.length >= 2) out.push(curr);
        curr = { key, pts: [series[i - 1], pt] };
      } else {
        curr.pts.push(pt);
      }
      prev = pt.price;
    }
    if (curr.pts.length >= 2) out.push(curr);
    return out;
  }, [series]);

  const currentSlopeKey: "up" | "down" = useMemo(() => {
    const L = series.length;
    if (L < 2) return "up";
    return series[L - 1].price >= series[L - 2].price ? "up" : "down";
  }, [series]);

  const [balance, setBalance] = useState(10000);
  const [leverage, setLeverage] = useState(10);
  const [orderSize, setOrderSize] = useState(500);
  const makerFee = 0.0002;
  const takerFee = 0.0006;

  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<ClosedTrade[]>([]);

  const totalUnrealized = positions.reduce((sum, p) => {
    const pnl =
      p.side === "long" ? (price - p.entry) * p.qty : (p.entry - price) * p.qty;
    return sum + pnl;
  }, 0);
  const equity = balance + totalUnrealized;

  // --- place & close ---
  const placeOrder = (side: "long" | "short") => {
    if (orderSize <= 0) return;
    const fee = orderSize * takerFee;
    const margin = orderSize / leverage;
    const needed = margin + fee;
    if (balance < needed)
      return alert("Insufficient balance for margin + fee.");

    const qty = orderSize / price;
    const pos: Position = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      side,
      key: currentSlopeKey, // <-- mark slope at open
      entry: price,
      qty,
      size: orderSize,
      leverage,
      feePaid: fee,
      time: Date.now(),
    };
    setBalance((b) => b - needed);
    setPositions((ps) => ps.concat(pos));
  };

  const closePosition = (id: string) => {
    const p = positions.find((x) => x.id === id);
    if (!p) return;
    const exit = price;
    const pnl =
      p.side === "long" ? (exit - p.entry) * p.qty : (p.entry - exit) * p.qty;
    const closeFee = p.size * makerFee;
    const delta = p.size / p.leverage + pnl - closeFee;
    setBalance((b) => b + delta);
    setHistory((h) => [
      {
        id: p.id,
        side: p.side,
        entry: p.entry,
        exit,
        size: p.size,
        pnl,
        fee: p.feePaid + closeFee,
        timeOpen: p.time,
        timeClose: Date.now(),
      },
      ...h,
    ]);
    setPositions((ps) => ps.filter((x) => x.id !== id));
  };

  const closeAll = () => positions.forEach((p) => closePosition(p.id));

  // --- price shock (fixed) ---
  const shock = (mult: number) => {
    const newPrice = price * mult;
    setPrice(newPrice);
    setData((prev) => {
      const tick: Tick = { t: Date.now(), price: newPrice };
      const arr = prev.concat(tick);
      if (arr.length > 240) arr.shift();
      return arr;
    });
  };

  // entry markers on the chart
  const markers = useMemo(
    () =>
      positions.map((p) => ({
        t: p.time,
        price: p.entry,
        side: p.side,
        id: p.id,
      })),
    [positions]
  );

  return (
    <div className="w-full min-h-[100vh] bg-zinc-950 text-zinc-100 p-4 md:p-6">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span className="opacity-70">Price</span>
                  <span className="font-semibold">${fmt(price)}</span>
                </div>
                <Button
                  variant={running ? "secondary" : "default"}
                  onClick={() => setRunning((r) => !r)}
                  className="gap-2"
                >
                  {running ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="h-[420px] w-full px-2 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={series}
                  margin={{ left: 8, right: 8, top: 10, bottom: 0 }}
                >
                  {/* gradients */}
                  <defs>
                    <linearGradient id="fillBase" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#22c55e"
                        stopOpacity={0.18}
                      />
                      <stop
                        offset="100%"
                        stopColor="#22c55e"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                    <linearGradient id="fillUp" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#22c55e"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="#22c55e"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                    <linearGradient id="fillDown" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#ef4444"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ef4444"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="t"
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    scale="time"
                    allowDuplicatedCategory={false}
                    tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                    stroke="#a1a1aa"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    domain={["auto", "auto"]}
                    stroke="#a1a1aa"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `$${fmt(v, 0)}`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine
                    y={price}
                    stroke="#71717a"
                    strokeDasharray="4 4"
                  />

                  {/* single soft base fill so the chart feels like a trading app */}
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="transparent"
                    fill="url(#fillBase)"
                    fillOpacity={1}
                    dot={false}
                    isAnimationActive={false}
                  />

                  {/* colored strokes per continuous run – NO GAPS, NO BIG RECTANGLES */}
                  {runs.map((r, i) => (
                    <Area
                      key={i}
                      data={r.pts}
                      dataKey="price"
                      type="linear" // <= was "monotone"
                      stroke={r.key === "up" ? "#22c55e" : "#ef4444"}
                      fill="transparent"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}

                  {/* entry markers (unchanged) */}
                  <Scatter
                    data={markers}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shape={(props: any) => {
                      const { cx, cy, payload } = props;
                      const isLong = payload.side === "long";
                      return (
                        <g>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={isLong ? "#10b981" : "#ef4444"}
                            opacity={0.9}
                          />
                          {isLong ? (
                            <ArrowUpRight
                              x={cx - 6}
                              y={cy - 18}
                              width={12}
                              height={12}
                              color="#10b981"
                            />
                          ) : (
                            <ArrowDownRight
                              x={cx - 6}
                              y={cy - 18}
                              width={12}
                              height={12}
                              color="#ef4444"
                            />
                          )}
                        </g>
                      );
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 pb-4">
              <Stat label="Balance" value={`$${fmt(balance)}`} />
              <Stat
                label="Unrealized PnL"
                value={`${totalUnrealized >= 0 ? "+" : ""}$${fmt(
                  totalUnrealized
                )}`}
                valueClass={
                  totalUnrealized >= 0 ? "text-emerald-400" : "text-rose-400"
                }
              />
              <Stat label="Equity" value={`$${fmt(equity)}`} />
              <Stat label="Price" value={`$${fmt(price)}`} />
            </div>
          </div>

          {/* positions */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800">
                  <th className="p-3 text-left">Side</th>
                  <th className="p-3 text-left">Slope</th>
                  <th className="p-3 text-right">Entry</th>
                  <th className="p-3 text-right">Size</th>
                  <th className="p-3 text-right">Lev</th>
                  <th className="p-3 text-right">PnL</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {positions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-zinc-500">
                      No open positions.
                    </td>
                  </tr>
                )}
                {positions.map((p) => {
                  const pnl =
                    p.side === "long"
                      ? (price - p.entry) * p.qty
                      : (p.entry - price) * p.qty;
                  return (
                    <tr key={p.id} className="border-b border-zinc-800/60">
                      <td className="p-3">
                        <Badge
                          className={
                            p.side === "long"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-600"
                              : "bg-rose-500/20 text-rose-300 border border-rose-600"
                          }
                        >
                          {p.side.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge
                          className={
                            p.key === "up"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-600"
                              : "bg-rose-500/20 text-rose-300 border border-rose-600"
                          }
                        >
                          {p.key.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">${fmt(p.entry)}</td>
                      <td className="p-3 text-right">${fmt(p.size)}</td>
                      <td className="p-3 text-right">{p.leverage}x</td>
                      <td
                        className={
                          "p-3 text-right " +
                          (pnl >= 0 ? "text-emerald-400" : "text-rose-400")
                        }
                      >
                        {pnl >= 0 ? "+" : ""}${fmt(pnl)}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => closePosition(p.id)}
                        >
                          Close
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {positions.length > 0 && (
              <div className="p-3 flex justify-end">
                <Button variant="destructive" onClick={closeAll}>
                  Close All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* right panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs text-zinc-400">Available Balance</div>
            <div className="text-2xl font-semibold">${fmt(balance)}</div>

            <div className="space-y-2">
              <label className="text-sm">Order Size (USDT)</label>
              <input
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                type="number"
                value={orderSize}
                onChange={(e) => setOrderSize(Number(e.target.value))}
              />
              <div className="text-xs text-zinc-400">
                Est. margin: ${fmt(orderSize / leverage)} • Fee (taker): $
                {fmt(orderSize * takerFee)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                className="bg-emerald-600 hover:bg-emerald-500"
                onClick={() => placeOrder("long")}
              >
                <TrendingUp className="h-4 w-4 mr-2" /> Buy / Long
              </Button>
              <Button
                className="bg-rose-600 hover:bg-rose-500"
                onClick={() => placeOrder("short")}
              >
                <TrendingDown className="h-4 w-4 mr-2" /> Sell / Short
              </Button>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                onClick={() => shock(1.02)}
                className="gap-2"
              >
                <Zap className="h-4 w-4" />
                Pump +2%
              </Button>
              <Button
                variant="secondary"
                onClick={() => shock(0.98)}
                className="gap-2"
              >
                <Zap className="h-4 w-4 rotate-180" />
                Dump -2%
              </Button>
            </div>

            <div className="rounded-xl border border-zinc-800 p-3 text-xs text-zinc-400">
              <div>
                Fees: Taker {Math.round(takerFee * 1e4) / 1e2}% • Maker{" "}
                {Math.round(makerFee * 1e4) / 1e2}%
              </div>
              <div>Closing uses maker fee and returns margin ± PnL.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// small stat tile
function Stat({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="text-xs uppercase tracking-wide text-zinc-400">
        {label}
      </div>
      <div className={"text-xl md:text-2xl font-semibold mt-1 " + valueClass}>
        {value}
      </div>
    </div>
  );
}
