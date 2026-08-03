import type { Metadata } from "next";
import { connection } from "next/server";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning>
          <ConvexClientProvider>
            <AppChrome>{children}</AppChrome>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
