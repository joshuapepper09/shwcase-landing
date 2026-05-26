import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shwcase — Show up. Stand out.",
  description: "The platform where creators get discovered and brands find real talent. Built for the next generation of creative professionals.",
  openGraph: {
    title: "Shwcase — Show up. Stand out.",
    description: "The platform where creators get discovered and brands find real talent.",
    url: "https://shwcase.app",
    siteName: "Shwcase",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shwcase — Show up. Stand out.",
    description: "The platform where creators get discovered and brands find real talent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0a' }}>{children}</body>
    </html>
  );
}