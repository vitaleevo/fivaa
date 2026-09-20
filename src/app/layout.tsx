import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { connection } from "next/server";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { EventJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#124734",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fivaaforum.com"),
  title: {
    default: "FIVAA 2026 — Fórum Internacional da Valorização da Arte Africana",
    template: "%s | FIVAA 2026",
  },
  description:
    "20 e 21 de novembro de 2026 | Palácio de Ferro, Luanda, Angola. O Fórum Internacional dedicado à promoção, valorização e desenvolvimento das indústrias criativas e arte africana.",
  keywords: [
    "FIVAA",
    "FIVAA 2026",
    "arte africana",
    "fórum Luanda",
    "Palácio de Ferro",
    "indústrias criativas África",
    "cultura angolana",
    "fórum arte africana",
    "exposição arte Luanda",
    "artistas africanos",
  ],
  authors: [{ name: "FIVAA", url: "https://fivaaforum.com" }],
  creator: "FIVAA",
  publisher: "FIVAA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
    languages: {
      "pt-AO": "./",
      "pt": "./",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "FIVAA 2026 — Fórum Internacional da Valorização da Arte Africana",
    description:
      "20 e 21 de novembro de 2026 no Palácio de Ferro em Luanda, Angola. Debates, exposições, workshops e performances com artistas e líderes criativos de toda a África.",
    url: "https://fivaaforum.com",
    siteName: "FIVAA 2026",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/images/hero/fivaa-forum-hero.webp",
        width: 1200,
        height: 630,
        alt: "FIVAA 2026 — Palácio de Ferro, Luanda, Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIVAA 2026 — Fórum Internacional da Valorização da Arte Africana",
    description:
      "20 e 21 de novembro de 2026 | Palácio de Ferro, Luanda, Angola. O maior palco de valorização da arte africana.",
    images: ["/images/hero/fivaa-forum-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "culture",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  return (
    <ConvexAuthNextjsServerProvider>
      <html
        lang="pt-AO"
        className={`scroll-smooth ${montserrat.variable} ${openSans.variable}`}
        suppressHydrationWarning
      >
        <head>
          <EventJsonLd />
          <OrganizationJsonLd />
        </head>
        <body className="flex min-h-screen flex-col font-sans antialiased" suppressHydrationWarning>
          <ConvexClientProvider>
            <AppChrome>{children}</AppChrome>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
