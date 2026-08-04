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
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "frame-src https://challenges.cloudflare.com",
    "connect-src 'self' https://*.convex.cloud https://*.convex.site wss://*.convex.cloud wss://*.convex.site https://challenges.cloudflare.com",
    "upgrade-insecure-requests",
  ].join("; ");
}

function applySecurityHeaders(
  response: NextResponse,
  headers: Headers,
  nonce: string,
) {
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", contentSecurityPolicy);

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

const PAINEL_HOST = "painel.fivaa.com";

export default convexAuthNextjsMiddleware(async (request: NextRequest) => {
  try {
    const host = request.headers.get("host") ?? "";
    const isPainel = host.toLowerCase() === PAINEL_HOST;

    if (isPainel && !request.nextUrl.pathname.startsWith("/admin")) {
      const target = new URL("https://fivaa.com/admin");
      return NextResponse.redirect(target, 308);
    }

    const requestHeaders = new Headers(request.headers);
    const nonce = crypto.randomUUID().replace(/-/g, "");
    const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return applySecurityHeaders(response, requestHeaders, nonce);
  } catch {
    return NextResponse.next();
  }
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
