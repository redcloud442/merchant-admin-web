// lib/getTenantSupabase.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getTenantSupabase(companyName: string) {
  const cookieStore = await cookies();

  const configMap = {
    "warehouse-pal-project": {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_WAREHOUSE_PROJECT!,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_WAREHOUSE_PROJECT!,
    },
    "district-1": {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_DISTRICT_1!,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DISTRICT_1!,
    },
    "dispatcher-1": {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_DISPATCHER_1!,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DISPATCHER_1!,
    },
  };

  const config = configMap[companyName as keyof typeof configMap];

  if (!config) {
    return { redirect: `/login/${companyName}` };
  }

  return createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
