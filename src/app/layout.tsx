import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "De Slokken Veiling 🍻 | Kampvuur Party Game",
  description: "Bied slokken, bluf je vrienden en ontkom aan straffen rond het kampvuur!",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark bg-slate-950 text-slate-100">
      <body className="antialiased min-h-screen bg-slate-950 selection:bg-amber-500 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
