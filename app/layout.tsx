import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Flute",
  description: "Jump on the Flute! Private, real-time, action-oriented social app for coworkers.",
  manifest: "/manifest.json",
  themeColor: "#5eead4",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flute",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
