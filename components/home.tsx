import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
export const revalidate = 0;

export async function getInititalTweets(page:number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true,
        }
      },
    },
    take: page*2,
    orderBy: {
      created_at: "desc"
    }
  });
  return tweets;
};

export type InitialTweets = Prisma.PromiseReturnType<typeof getInititalTweets>;

export default async function Home() {
  const initialTweets = await getInititalTweets(1);

  return (
    <>
      <TweetList initialTweets={initialTweets} />
    </>
  )
}