import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Knowledge & Library Management Platform",
  description:
    "A modern Knowledge & Library Management Platform designed to preserve, manage and democratize access to Ambedkarite literature, constitutional studies, social justice resources and public knowledge archives.",
  keywords: [
    "Library Management",
    "Knowledge Platform",
    "Ambedkarite Literature",
    "Digital Library",
    "Maharashtra",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
