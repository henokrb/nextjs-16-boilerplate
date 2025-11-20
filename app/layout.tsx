import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./theme-provider";
import { baseURL } from "@/lib/config";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: "Atlantic IT Solutions — Web Dev & Hosting in Addis Ababa",
  description: "Local web development, hosting and business email solutions for Addis Ababa businesses. Fast, secure websites — request a free consultation.",
  keywords: ["Web development Addis Ababa",
    "Web developer Addis Ababa",
    "Web hosting Ethiopia",
    "Business email Addis Ababa",
    "Web agency Ethiopia"],
  applicationName: "Atlantic IT Solutions",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "am-ET": "/et"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large"      
    }
  },
  openGraph: {
    //  for Facebook, LinkedIn and most social previews.
    title: "Atlantic IT Solutions — Web Dev & Hosting in Addis Ababa",
    description: "Trusted local web & software development, hosting and business email for Addis Ababa companies. Free consultation available.",
    url: `${baseURL}/`,
    siteName: "Atlantic IT Solutions",
    images: [
      {
        url: `${baseURL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Atlantic IT Solutions — Web & Software Development"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    //  for Twitter, it's different from Facebook, LinkedIn and most social previews.
    card: "summary_large_image",
    title: "Atlantic IT Solutions — Web Dev & Hosting (Addis Ababa)",
    description: "Web apps, hosting and business email for Addis Ababa businesses. Request a free consult.",
    creator: "@yourTwitterHandle",
    images: [`${baseURL}/og-default.png`]
  },
  verification: {
    google: "google-site-verification-code",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseURL}/#localbusiness`,
    "name": "Atlantic IT Solutions",
    "description": "Web development, hosting and business email solutions in Addis Ababa, Ethiopia.",
    "url": baseURL,
    "telephone": "+251-911-603566",
    "image": `${baseURL}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/atlanticits",
      "https://www.linkedin.com/company/atlantic-it-solutions-et"     
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lebu Mebrat",
      "addressLocality": "Addis Ababa",
      "addressRegion": "Addis Ababa",
      "postalCode": "15 code 1000",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.94917,
      "longitude": 38.73560
    },
    "openingHours": "Mo-Fr 09:00-17:00"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseURL}/#website`,
    "url": baseURL,
    "name": "Atlantic IT Solutions",
    "publisher": { "@id": `${baseURL}/#localbusiness` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseURL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseURL}/#organization`,
    "name": "Atlantic IT Solutions",
    "url": baseURL,
    "logo": `${baseURL}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/atlanticits",
      "https://www.linkedin.com/company/atlantic-it-solutions-et"
    ]
  };

  const schemas = [localBusinessSchema, websiteSchema, organizationSchema];

  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* System preference auto-detect theme mode with the head script */}
     <head>
      {/* // 3-Way (dark/light/system) Toggle with Tooltip on Hover
           <script
          dangerouslySetInnerHTML={{
            __html: `
              const saved = localStorage.getItem('theme');

              if (saved === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (saved === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                // SYSTEM MODE
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
            `,
          }}
        />  */}
 
        {/* 2-Way (dark/light) Toggle with Tooltip on Hover */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const saved = localStorage.getItem('theme');
              if (saved === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (saved === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              }
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
            {/* LocalBusiness JSON-LD for local SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <Header /> 
            <main className="flex-1 justify-center items-center p-4 min-h-screen">
            {children}
            </main>
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
