import { CompanyName } from "@/lib/types";
import { NextResponse, type NextRequest } from "next/server";
import { getTenantSupabase } from "./server";

export async function updateSession(request: NextRequest, tenant: string) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!tenant) {
    return NextResponse.redirect(new URL(`/login/${tenant}`, request.url));
  }

  const supabase = await getTenantSupabase(tenant as CompanyName);

  if ("redirect" in supabase) {
    return NextResponse.redirect(new URL(`/login/${tenant}`, request.url));
  }

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith(`/login/${tenant}`)) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = `/login/${tenant}`;
    return NextResponse.redirect(url);
  } else if (
    user &&
    (request.nextUrl.pathname.startsWith(`/login/${tenant}`) ||
      request.nextUrl.pathname.startsWith(`/${tenant}`))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${tenant}/dashboard`;
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
