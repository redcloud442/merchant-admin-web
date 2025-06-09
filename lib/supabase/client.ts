// lib/getTenantBrowserSupabase.ts
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { CompanyName } from "../types";

type TenantKey = CompanyName;

const TENANT_BROWSER_SUPABASE_CONFIG: Record<
  TenantKey,
  { url: string; key: string }
> = {
  "district-1": {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_DISTRICT_1!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DISTRICT_1!,
  },
  "warehouse-pal-project": {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_WAREHOUSE_PROJECT!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_WAREHOUSE_PROJECT!,
  },
  "dispatcher-1": {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_DISPATCHER_1!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DISPATCHER_1!,
  },
  "agri-plus": {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_AGRI_PLUS!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_AGRI_PLUS!,
  },
};

export function getTenantBrowserSupabase(companyName: string): SupabaseClient {
  const key = companyName.toLowerCase() as TenantKey;

  const config = TENANT_BROWSER_SUPABASE_CONFIG[key];

  if (!config)
    throw new Error(`No browser Supabase config found for "${companyName}"`);

  return createBrowserClient(config.url, config.key);
}
