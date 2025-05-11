"use server";

import db from "@/lib/db";

export async function getSearchTweets(keyword:string) {
  // const data = {
  //   searchQuery: formData.get("searchQuery")?.toString().trim()
  // }

  const tweets = db.tweet.findMany({
      where: {
        tweet: {
          contains: keyword,
        },
      },
      select: {
        tweet: true,
        created_at: true,
        id: true,
        user: {
          select: {
            username: true,
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    })

  return tweets;
}