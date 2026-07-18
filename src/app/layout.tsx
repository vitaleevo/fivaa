import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  metadataBase: new URL("https://fivaaforum.com"),
  title: "FIVAA — Fórum Internacional para a Valorização da Arte Africana",
  description:
    "20-21 Novembro 2026 | Palácio de Ferro, Luanda, Angola. Fórum & Festival Internacional dedicado à promoção, valorização e desenvolvimento das indústrias criativas africanas.",
  keywords: [
    "FIVAA",
    "arte africana",
    "festival Luanda",
    "indústrias criativas",
    "África",
    "cultura angolana",
  ],
  icons: {
    icon: "/images/ICONE 1.png",
    apple: "/images/ICONE 1.png",
  },
  openGraph: {
    title: "FIVAA 2026",
    description:
      "Fórum & Festival Internacional da Valorização da Arte Africana",
    siteName: "FIVAA",
    locale: "pt_AO",
    type: "website",
    images: ["/images/logo-fivaa-principal.png"],
  },
  other: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/images/ICONE 1.png" type="image/png" />
          <link rel="apple-touch-icon" href="/images/ICONE 1.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning>
          <ConvexClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
