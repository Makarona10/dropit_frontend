import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
