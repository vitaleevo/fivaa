import { NextResponse, type NextRequest } from "next/server";
import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";

function buildContentSecurityPolicy(nonce: string) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com${
      isDevelopment ? " 'unsafe-eval'" : ""
    }`,
    `style-src 'self' https://fonts.googleapis.com ${
      isDevelopment ? "'unsafe-inline'" : `'nonce-${nonce}'`
    }`,
    // Next/Image and React use style attributes; script and style elements remain nonce-protected.
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "frame-src https://challenges.cloudflare.com",
    "connect-src 'self' https://*.convex.cloud https://*.convex.site wss://*.convex.cloud wss://*.convex.site https://challenges.cloudflare.com",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

function applySecurityHeaders(
  response: NextResponse,
  nonce: string,
) {
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  return response;
}

const ADMIN_HOST = "admin.fivaaforum.com";

export default convexAuthNextjsMiddleware(async (request: NextRequest) => {
    const requestHeaders = new Headers(request.headers);
    const nonce = crypto.randomUUID().replace(/-/g, "");
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));
    const forwarding = { request: { headers: requestHeaders } };
    const host = request.headers.get("host") ?? "";
    const normalizedHost = host.toLowerCase();
    const pathname = request.nextUrl.pathname;
    const isAdminSubdomain = normalizedHost === ADMIN_HOST;

    if (isAdminSubdomain) {
      const url = request.nextUrl.clone();

      if (pathname === "/") {
        url.pathname = "/admin";
        return applySecurityHeaders(NextResponse.rewrite(url, forwarding), nonce);
      }

      if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        return applySecurityHeaders(NextResponse.next(forwarding), nonce);
      }

      if (pathname !== "/api" && !pathname.startsWith("/api/")) {
        url.pathname = `/admin${pathname}`;
        return applySecurityHeaders(NextResponse.rewrite(url, forwarding), nonce);
      }
    }

    return applySecurityHeaders(NextResponse.next(forwarding), nonce);
});

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
