import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "shwcase",
  description: "quiet films about ordinary places, and the people who send me to them.",
  openGraph: {
    title: "shwcase",
    description: "quiet films about ordinary places, and the people who send me to them.",
    url: "https://shwcase.app",
    siteName: "shwcase",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shwcase",
    description: "quiet films about ordinary places, and the people who send me to them.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#0a0a0a',
          color: '#f2f2f2',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
