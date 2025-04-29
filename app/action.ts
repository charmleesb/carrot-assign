"use server";

import db from "@/lib/db";

export async function getMoreTweets(page:number) {
  const products = await db.tweet.findMany({
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
    skip: page*2,
    take: 2,
    orderBy: {
      created_at: "desc"
    }
  });
  return products;
}