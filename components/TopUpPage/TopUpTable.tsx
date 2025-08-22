"use client";

import { useRole } from "@/lib/context";
import { getTenantBrowserSupabase } from "@/lib/supabase/client";
import { AdminTopUpRequestData, TopUpRequestData } from "@/lib/types";
// import { getAdminTopUpRequest } from "@/services/TopUp/Admin";
import { COMPANY_NAME, RECIPT_MAPPING } from "@/lib/constant";
import { formatDateToLocal } from "@/lib/function";
import { getAdminTopUpRequest } from "@/services/Deposit/Deposit";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Header,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  Loader2,
  PhilippinePeso,
  RefreshCw,
  Search,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import CardAmountAdmin from "../ui/cardAmountAdmin";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TopUpColumn } from "./TopUpColumn";
import TopUpTabs from "./TopUpTabs";

type FilterFormValues = {
  referenceId: string;
  userFilter: string;
  statusFilter: string;
  rejectNote: string;
  dateFilter: { start: string; end: string };
};

type TopUpTableProps = {
  companyName: string;
};

const TopUpTable = ({ companyName }: TopUpTableProps) => {
  const supabaseClient = getTenantBrowserSupabase(companyName);
  const { teamMemberProfile } = useRole();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [requestData, setRequestData] = useState<AdminTopUpRequestData | null>(
    null
  );
  const [activePage, setActivePage] = useState(1);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const columnAccessor = sorting?.[0]?.id || "company_deposit_request_date";
  const isAscendingSort =
    sorting?.[0]?.desc === undefined ? true : !sorting[0].desc;

  const fetchRequest = async () => {
    try {
      if (!teamMemberProfile) return;
      setIsFetchingList(true);

      const { referenceId, userFilter, statusFilter, dateFilter } = getValues();

      const startDate = dateFilter.start
        ? new Date(dateFilter.start)
        : undefined;
      const formattedStartDate = startDate ? formatDateToLocal(startDate) : "";

      const requestData = await getAdminTopUpRequest(
        {
          page: activePage,
          limit: 10,
          columnAccessor: columnAccessor,
          isAscendingSort: isAscendingSort,
          search: referenceId,
          userFilter,
          statusFilter: statusFilter ?? "PENDING",
          dateFilter: {
            start: formattedStartDate,
            end: formattedStartDate,
          },
        },
        companyName
      );

      setRequestData((prev: AdminTopUpRequestData | null) => {
        if (!prev) {
          return {
            data: {
              APPROVED: {
                data: [],
                count: requestData?.data?.APPROVED?.count || 0,
              },
              REJECTED: {
                data: [],
                count: requestData?.data?.REJECTED?.count || 0,
              },
              PENDING: {
                data: [],
                count: requestData?.data?.PENDING?.count || 0,
              },
              [statusFilter as "PENDING" | "APPROVED" | "REJECTED"]: requestData
                ?.data?.[
                statusFilter as "PENDING" | "APPROVED" | "REJECTED"
              ] || {
                data: [],
                count: 0,
              },
            },
            merchantBalance: requestData?.merchantBalance || 0,
            totalPendingDeposit: requestData?.totalPendingDeposit || 0,
            totalApprovedDeposit: requestData?.totalApprovedDeposit || 0,
          };
        }

        return {
          ...prev,
          data: {
            ...prev.data,
            [statusFilter as "PENDING" | "APPROVED" | "REJECTED"]: requestData
              ?.data?.[statusFilter as "PENDING" | "APPROVED" | "REJECTED"] || {
              data: [],
              count: 0,
            },
          },
          totalApprovedDeposit: requestData?.totalApprovedDeposit || 0,
          totalPendingDeposit: requestData?.totalPendingDeposit || 0,
        };
      });
    } catch (e) {
      toast.error(`Invalid Request`, {
        description: `Something went wrong`,
      });
    } finally {
      setIsFetchingList(false);
    }
  };

  const handleFilter = async () => {
    try {
      await handleRefresh();
    } catch (e) {}
  };

  const handleRefresh = async () => {
    try {
      setIsFetchingList(true);

      const statuses: Array<"PENDING" | "APPROVED" | "REJECTED"> = [
        "PENDING",
        "APPROVED",
        "REJECTED",
      ];

      const updatedData: AdminTopUpRequestData = {
        data: {
          APPROVED: { data: [], count: 0 },
          REJECTED: { data: [], count: 0 },
          PENDING: { data: [], count: 0 },
        },
        merchantBalance: 0,
      };

      const { referenceId, userFilter, statusFilter, dateFilter } = getValues();

      const startDate = dateFilter.start
        ? new Date(dateFilter.start)
        : undefined;
      const endDate = startDate ? new Date(startDate) : undefined;

      setActivePage(1);
      const requestData = await getAdminTopUpRequest(
        {
          page: activePage,
          limit: 10,
          columnAccessor: columnAccessor,
          isAscendingSort: isAscendingSort,
          search: referenceId,
          userFilter,
          statusFilter: statusFilter ?? "PENDING",
          dateFilter: {
            start:
              startDate && !isNaN(startDate.getTime())
                ? startDate.toISOString()
                : undefined,
            end:
              endDate && !isNaN(endDate.getTime())
                ? new Date(endDate.setHours(23, 59, 59, 999)).toISOString()
                : undefined,
          },
        },
        companyName
      );

      for (const status of statuses) {
        updatedData.data[status] = requestData?.data?.[status] || {
          data: [],
          count: 0,
        };
      }

      updatedData.merchantBalance = requestData?.merchantBalance || 0;
      updatedData.totalPendingDeposit = requestData?.totalPendingDeposit || 0;
      updatedData.totalApprovedDeposit = requestData?.totalApprovedDeposit || 0;
      setRequestData(updatedData);
    } catch (e) {
      toast.error(`Invalid Request`, {
        description: `Something went wrong`,
      });
    } finally {
      setIsFetchingList(false); // Reset loading state
    }
  };

  const { register, handleSubmit, watch, getValues, control, reset, setValue } =
    useForm<FilterFormValues>({
      defaultValues: {
        referenceId: "",
        userFilter: "",
        statusFilter: "PENDING",
        dateFilter: {
          start: undefined,
          end: undefined,
        },
        rejectNote: "",
      },
    });

  const status = watch("statusFilter") as "PENDING" | "APPROVED" | "REJECTED";

  const {
    columns,
    isOpenModal,
    isLoading,
    setIsOpenModal,
    handleUpdateStatus,
  } = TopUpColumn(setRequestData, reset, status, companyName);

  const table = useReactTable({
    data: requestData?.data?.[status]?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    fetchRequest();
  }, [supabaseClient, teamMemberProfile, activePage, sorting]);

  const pageCount = Math.ceil((requestData?.data?.[status]?.count || 0) / 10);

  const handleSwitchChange = (checked: boolean) => {
    setShowFilters(checked);
    if (!checked) {
      reset();
      handleRefresh();
    }
  };

  const handleTabChange = async (type?: string) => {
    setValue("statusFilter", type as "PENDING" | "APPROVED" | "REJECTED");
    if (
      requestData?.data?.[type as "PENDING" | "APPROVED" | "REJECTED"]?.data
        ?.length
    ) {
      return;
    }

    await fetchRequest();
  };

  const rejectNote = watch("rejectNote");

  const tableColumns = useMemo(() => {
    return table.getAllColumns().map((column) => {
      const header = column.columnDef.header;
      let columnLabel = column.id || "Unnamed Column"; // Default to column id

      if (typeof header === "string") {
        columnLabel = header;
      } else if (typeof header === "function") {
        const renderedHeader = header({
          column,
          header: column.columnDef.header as unknown as Header<
            TopUpRequestData,
            unknown
          >,
          table,
        });

        if (React.isValidElement(renderedHeader)) {
          const props = renderedHeader.props as { children: string | string[] };
          if (typeof props.children === "string") {
            columnLabel = props.children;
          } else if (Array.isArray(props.children)) {
            columnLabel = props.children
              .map((child) => (typeof child === "string" ? child : ""))
              .join("");
          }
        }
      }

      return {
        label: columnLabel, // Extracted column name
        accessorFn: column.id,
        getCanHide: column.getCanHide,
        getIsVisible: column.getIsVisible,
        toggleVisibility: column.toggleVisibility,
      };
    });
  }, [table]);

  const handleReject = async (text: string) => {
    setValue("rejectNote", text);
  };

  return (
    <>
      {companyName === COMPANY_NAME.PALPROJECT_WAREHOUSING ||
        companyName === COMPANY_NAME.PALDISTRIBUTION_AGRI_PLUS ||
        companyName === COMPANY_NAME.PALDISTRIBUTION_DISPATCHER_1 || (
          <div className="flex gap-4 w-full">
            {teamMemberProfile.user_username === "headmerchant" && (
              <CardAmountAdmin
                className="w-full"
                title="Total Approved Deposit"
                value={
                  <>
                    <PhilippinePeso />
                    {requestData?.totalApprovedDeposit?.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    ) ?? "0.00"}
                  </>
                }
                description=""
                descriptionClassName="text-sm text-gray-500 font-bold"
              />
            )}
            <CardAmountAdmin
              title="Total Pending Deposit"
              value={
                <>
                  <PhilippinePeso />
                  {requestData?.totalPendingDeposit?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "0.00"}
                </>
              }
              description=""
              descriptionClassName="text-sm text-gray-500 font-bold"
            />
          </div>
        )}
      <Card className="w-full rounded-sm p-4">
        <div className="flex flex-wrap gap-4 items-start py-4">
          <form
            className="flex flex-col gap-6 w-full max-w-4xl rounded-md"
            onSubmit={handleSubmit(handleFilter)}
          >
            {isOpenModal && (
              <Dialog
                open={isOpenModal.open}
                onOpenChange={(open) => {
                  setIsOpenModal({ ...isOpenModal, open });
                  if (!open) {
                    reset();
                    setIsOpenModal({
                      open: false,
                      requestId: "",
                      status: "",
                      amount: 0,
                    });
                  }
                }}
              >
                <DialogDescription></DialogDescription>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {isOpenModal.status.charAt(0).toUpperCase() +
                        isOpenModal.status.slice(1).toLocaleLowerCase()}{" "}
                      This Request
                    </DialogTitle>
                  </DialogHeader>
                  {isOpenModal.status === "REJECTED" && (
                    <div className="flex flex-col gap-2">
                      <Controller
                        name="rejectNote"
                        control={control}
                        rules={{ required: "Rejection note is required" }}
                        render={({ field }) => (
                          <TooltipProvider>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <Textarea
                                  placeholder="Enter the reason for rejection..."
                                  {...field}
                                />
                              </TooltipTrigger>

                              <TooltipContent
                                side="bottom"
                                className="space-y-2 flex flex-col dark:bg-stone-900"
                              >
                                {RECIPT_MAPPING.map((item) => (
                                  <Button
                                    key={item.label}
                                    className="rounded-md text-balance"
                                    onClick={() => handleReject(item.value)}
                                  >
                                    {item.label}
                                  </Button>
                                ))}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose asChild>
                      <Button variant="secondary" className="rounded-md">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      className="rounded-md"
                      onClick={() =>
                        handleUpdateStatus(
                          isOpenModal.status,
                          isOpenModal.requestId,
                          rejectNote
                        )
                      }
                    >
                      {isLoading ? (
                        <>
                          {isOpenModal.status.charAt(0).toUpperCase() +
                            isOpenModal.status
                              .slice(1)
                              .toLocaleLowerCase()}{" "}
                          <Loader2 className="animate-spin" />
                        </>
                      ) : isOpenModal.status === "REJECTED" ? (
                        "Confirm Reject"
                      ) : (
                        "Confirm Approve"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <div className="flex flex-wrap gap-2 items-center w-full">
              <Input
                {...register("referenceId")}
                placeholder="Filter requestor username..."
                className="max-w-sm p-2 border rounded dark:text-white dark:placeholder:text-white"
              />
              <Button
                type="submit"
                disabled={isFetchingList}
                size="sm"
                variant="default"
                className="rounded-md h-12"
              >
                <Search />
              </Button>
              <Button
                variant="secondary"
                className="rounded-md h-12"
                onClick={handleRefresh}
                disabled={isFetchingList}
                size="sm"
              >
                <RefreshCw />
                Refresh
              </Button>
              <div className="flex items-center space-x-2">
                <Switch
                  id="filter-switch"
                  checked={showFilters}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="filter">Filter</Label>
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-2 items-center rounded-md ">
                <Controller
                  name="dateFilter.start"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="font-normal justify-start h-12 rounded-md"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Select Start Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date: Date | undefined) =>
                            field.onChange(date?.toISOString() || "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />

                <Button className="h-12 rounded-md" onClick={handleRefresh}>
                  Submit
                </Button>
              </div>
            )}
          </form>
          <div className="flex justify-start gap-2  w-full">
            <div className="flex text-lg font-bold gap-2 items-center">
              Merchant Balance: <PhilippinePeso size={16} />
              {requestData?.merchantBalance?.toLocaleString()}
            </div>
          </div>
        </div>

        <Tabs defaultValue="PENDING" onValueChange={handleTabChange}>
          <div className="flex items-start :justify-start lg:justify-between flex-wrap gap-2">
            <TabsList className="mb-4">
              <TabsTrigger value="PENDING">
                Pending ({requestData?.data?.PENDING?.count || 0})
              </TabsTrigger>
              <TabsTrigger value="APPROVED">
                Approved ({requestData?.data?.APPROVED?.count || 0})
              </TabsTrigger>
              <TabsTrigger value="REJECTED">
                Rejected ({requestData?.data?.REJECTED?.count || 0})
              </TabsTrigger>
            </TabsList>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto rounded-md">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {tableColumns
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.accessorFn}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.label}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="PENDING">
            <TopUpTabs
              table={table}
              columns={columns}
              activePage={activePage}
              totalCount={requestData?.data?.PENDING?.count || 0}
              isFetchingList={isFetchingList}
              setActivePage={setActivePage}
              pageCount={pageCount}
            />
          </TabsContent>

          <TabsContent value="APPROVED">
            <TopUpTabs
              table={table}
              columns={columns}
              activePage={activePage}
              totalCount={requestData?.data?.APPROVED?.count || 0}
              isFetchingList={isFetchingList}
              setActivePage={setActivePage}
              pageCount={pageCount}
            />
          </TabsContent>

          <TabsContent value="REJECTED">
            <TopUpTabs
              table={table}
              columns={columns}
              activePage={activePage}
              totalCount={requestData?.data?.REJECTED?.count || 0}
              isFetchingList={isFetchingList}
              setActivePage={setActivePage}
              pageCount={pageCount}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default TopUpTable;
