import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: SITE_CONFIG.seo.title,
  description: SITE_CONFIG.seo.description,
  keywords: SITE_CONFIG.seo.keywords,
  authors: [{ name: "AI Builder Academy CI" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    url: SITE_CONFIG.seo.url,
    siteName: "AI BUILDER ACADEMY CI",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AI Builder Academy CI - Formation Vibe Coding & IA",
    "description": SITE_CONFIG.seo.description,
    "provider": {
      "@type": "Organization",
      "name": "AI Builder Academy CI",
      "sameAs": SITE_CONFIG.seo.url
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online Live",
      "duration": "P4W",
      "inLanguage": "fr"
    }
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-brand-cyan selection:text-brand-darker">
        {children}
      </body>
    </html>
  );
}
