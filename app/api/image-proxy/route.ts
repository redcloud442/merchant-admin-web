// app/api/image-proxy/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid image URL" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // optional: cache for 1 day
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
