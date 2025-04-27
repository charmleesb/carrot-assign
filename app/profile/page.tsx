import Button from "@/components/Button";
import db from "@/lib/db";
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  
  const user = await db.user.findUnique({
    where: {
      id: session.id
    },
    select: {
      username: true,
      email: true,
      bio: true,
    }
  });
  if (user) {
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen w-full items-center py-32 bg-white">
      <span className="text-3xl font-semibold">Profile</span>
      <div className="w-24 h-24 rounded-full bg-neutral-300 flex items-center justify-center text-5xl">
        🐥
      </div>
      <div className="flex flex-col w-full max-w-md gap-6 px-8">
        <div className="flex justify-between items-center pb-3">
          <span className="text-lg font-medium text-neutral-600">Name</span>
          <span className="text-lg font-semibold">{user?.username}</span>
        </div>
        <div className="flex justify-between items-center pb-3">
          <span className="text-lg font-medium text-neutral-600">Email</span>
          <span className="text-lg font-semibold break-words text-right">{user?.email}</span>
        </div>
      </div>
      <form action={logOut} className="w-full max-w-md px-8">
        <Button text="Log out"></Button>
      </form>
    </div>
  )
}