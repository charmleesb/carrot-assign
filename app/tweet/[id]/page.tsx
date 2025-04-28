import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getTweet(id:number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          bio: true
        }
      }
    }
  });
  return tweet;
}

export default async function TweetDetail({params,}:{params: {id:string}}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <div className="flex flex-col bg-sky-100 h-screen p-5">
      <div className="flex justify-between items-center border-b border-neutral-400 pb-2">
        <span className="text-xl">{tweet.user.username}</span>
        <div className="w-5 h-5 bg-sky-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">{tweet.user.bio}</span>
        </div>
      </div>
      <span className="py-10">{tweet.tweet}</span>
      <span className="text-right text-sm text-neutral-500">{formatToTimeAgo(tweet.created_at.toString())}</span>
    </div>
  );
}