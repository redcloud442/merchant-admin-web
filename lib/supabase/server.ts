// lib/getTenantSupabase.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getTenantSupabase(companyName: string) {
  const cookieStore = await cookies();

  const configMap = {
    elevate: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_ELEVATE!,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_ELEVATE!,
    },
    prime: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_PRIME!,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PRIME!,
    },
  };

  const config = configMap[companyName as keyof typeof configMap];

  if (!config) throw new Error(`Unknown Supabase tenant: ${companyName}`);

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
