import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Dropit",
  description: "A cloud app",
  icons: {
    icon: "/redlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased lining-nums bg-neutral-950`}>
        <NextTopLoader
          color="#FF0000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {/* <TopLoaderProvider /> */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
