import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
