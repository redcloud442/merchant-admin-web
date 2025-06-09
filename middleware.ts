import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { CompanyName } from "./lib/types";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const segments = pathname.split("/").filter(Boolean);

  let tenant: string | null = null;

  if (segments[0] === "login" && segments[1]) {
    tenant = segments[1];
  }
  // Case: /[tenant]/dashboard
  else if (segments[0] && segments[0] !== "api") {
    tenant = segments[0];
  }

  // Fallback: use x-tenant-id header
  tenant = tenant || req.headers.get("x-tenant-id");

  if (!pathname.startsWith("/api/v1")) {
    await updateSession(req, tenant as CompanyName);
  }

  // Validate tenant (for routing purposes)
  if (
    tenant &&
    tenant !== "warehouse-pal-project" &&
    tenant !== "district-1" &&
    tenant !== "dispatcher-1" &&
    tenant !== "agri-plus"
  ) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  // Proxy to appropriate server for /api
  if (pathname.startsWith("/api/v1")) {
    let target = process.env.NEXT_PUBLIC_API_URL_DISTRICT_1;
    if (tenant === "warehouse-pal-project") {
      target = process.env.NEXT_PUBLIC_API_URL_WAREHOUSE_PROJECT;
    }
    if (tenant === "dispatcher-1") {
      target = process.env.NEXT_PUBLIC_API_URL_DISPATCHER_1;
    }
    if (tenant === "agri-plus") {
      target = process.env.NEXT_PUBLIC_API_URL_AGRI_PLUS;
    }
    return NextResponse.rewrite(`${target}${pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/api/v1/:path*",
    "/login/:warehouse*", // now this matches `/login/prime`, `/login/elevate`, etc.
    "/:companyName*/dashboard",
  ],
};
