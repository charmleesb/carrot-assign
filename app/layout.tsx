import Link from "next/link";
import "./globals.css";
import { Poppins } from "next/font/google";
import getSession from "@/lib/session";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="text-black font-sans max-w-screen-sm mx-auto px-20 bg-slate-500 py-3">
        <header className="flex justify-between py-3 *:text-black pb-2 border-b-2 px-3 bg-white">
          <Link className="hover:underline hover:underline-offset-3" href="/">Home</Link>
          <Link className="hover:underline underline-offset-2" href={`/users/${session.id}`}>My Page</Link>
        </header>
        <main className="px-3 bg-white py-6">
          {children}
        </main>
      </body>
    </html>
  );
}