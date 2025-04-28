import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";

export async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true,
        }
      }
    }
  });
  return tweets;
};

export default async function Home() {
  const tweets = await getTweets();

  return (
    <div className="flex flex-col gap-5 py-3">
      {tweets.map((tweet) => <ListTweet key={tweet.id} {...tweet}/>)}
    </div>
  )
}