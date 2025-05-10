import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getuserTweets(userId:number) {
  const tweets = db.tweet.findMany({
    where: {
      id: {
        userId
      }
    },
    select: {
      tweet: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  
  return tweets;
}
