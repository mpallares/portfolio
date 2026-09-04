import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/personalInfo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariapallares.dev";
const title = `${personalInfo.name} | ${personalInfo.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: personalInfo.tagline,
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Software Engineer",
    personalInfo.name,
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title,
    description: personalInfo.tagline,
    siteName: `${personalInfo.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: personalInfo.tagline,
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
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
