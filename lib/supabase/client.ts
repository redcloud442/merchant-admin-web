// lib/getTenantBrowserSupabase.ts
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

type TenantKey = "elevate" | "prime";

const TENANT_BROWSER_SUPABASE_CONFIG: Record<
  TenantKey,
  { url: string; key: string }
> = {
  elevate: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_ELEVATE!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_ELEVATE!,
  },
  prime: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_PRIME!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PRIME!,
  },
};

export function getTenantBrowserSupabase(companyName: string): SupabaseClient {
  const key = companyName.toLowerCase() as TenantKey;

  const config = TENANT_BROWSER_SUPABASE_CONFIG[key];

  if (!config)
    throw new Error(`No browser Supabase config found for "${companyName}"`);

  return createBrowserClient(config.url, config.key);
}
