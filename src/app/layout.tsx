import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

// Helvetica Now Variable Fonts
const helveticaNowVar = localFont({
  src: [
    {
      path: "../../public/fonts/Helvetica-Now/Variable/Helvetica Now Var.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Helvetica-Now/Variable/Helvetica Now Var Italic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevation AI Design System",
  description: "A comprehensive design system built for modern applications",
  icons: {
    icon: "/images/Favicon.png",
    shortcut: "/images/Favicon.png",
    apple: "/images/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${helveticaNowVar.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
