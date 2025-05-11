import db from "@/lib/db";

export async function getuserTweets(userId:number) {
  const tweets = db.tweet.findMany({
    where: {
      userId: userId
    },
    select: {
      tweet: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true,
          id: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  
  return tweets;
}
