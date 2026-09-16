import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Foundry — Clubs & Activities",
  description: "Browse every club and activity at a glance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
