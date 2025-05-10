import UserTweetList from "@/components/user-tweet-list";
import db from "@/lib/db";
import getSession from "@/lib/session"
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { notFound, redirect } from "next/navigation";
import { getuserTweets } from "./actions";
import Link from "next/link";

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
  const userTweets = await getuserTweets(user.id);
  
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full items-center bg-white">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="w-24 h-24 rounded-full bg-neutral-300 flex items-center justify-center text-5xl">
          🐥
        </div>
        <Link href={`${user.username}/edit`} className="text-black border border-neutral-400 px-4 font-semibold py-2 h-full rounded-full hover:bg-neutral-200 transition text-sm">프로필 수정</Link>
      </div>
      <div className="flex flex-col w-full max-w-md gap-3">
        <div className="flex justify-between items-center">
          <span className="text-4xl font-semibold">{user?.username}</span>
          <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">{user?.bio}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 *:text-neutral-500">
          <i><EnvelopeIcon className="size-5" /></i>
          <span className="text-sm break-words text-right">{user?.email}</span>
        </div>
      </div>
      <UserTweetList initialTweets={userTweets} />
    </div>
  )
}