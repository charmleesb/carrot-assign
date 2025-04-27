import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

// Google Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-black font-sans max-w-screen-sm mx-auto px-20">
        {children}
      </body>
    </html>
  );
}