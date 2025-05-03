import { getMoreTweets } from "@/app/action";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
export const revalidate = 0;

export default async function Home() {
  const {tweets, totalPages} = await getMoreTweets(1);

  return (
    <>
      <TweetList initialTweets={tweets} initialTotalPages={totalPages} />
    </>
  )
}