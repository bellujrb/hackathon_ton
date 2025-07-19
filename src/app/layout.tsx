import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "./components/ToastProvider";
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground font-sans antialiased min-h-screen`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
