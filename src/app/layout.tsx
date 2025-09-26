import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Dropit",
  description: "A cloud app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased lining-nums bg-neutral-950`}>
        <NextTopLoader color="#FF0000" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
