import Link from "next/link";
import "./globals.css";
import { Poppins } from "next/font/google";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import Button from "@/components/common/Button";

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
  const logOut = async () => {
    "use server";
    const session = await getSession();
    console.log(session.id);
    await session.destroy();
    redirect("/");
  };
  
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="text-black font-sans max-w-screen-sm mx-auto px-20 bg-slate-500 py-3">
        <header className="flex justify-between py-3 pb-2 border-b-2 px-3 bg-white">
          <div className="flex gap-3 *:text-black">
            <Link className="hover:underline hover:underline-offset-3" href="/">Home</Link>
            <Link className="hover:underline underline-offset-2" href={`/users/${session.id}`}>My Page</Link>
          </div>
          <form action={logOut}>
            <button>{session.id? "Logout" : ""}</button>
          </form>
        </header>
        <main className="px-3 bg-white py-6">
          {children}
        </main>
      </body>
    </html>
  );
}