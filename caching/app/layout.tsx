import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Next.js Caching",
  description: "Learn how Next.js caching works"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-kr">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
