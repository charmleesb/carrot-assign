"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

interface TweetFormState {
  message?: string;
  success?: boolean;
}

export async function getMoreTweets(page:number, pageSize = 5) {
  const [tweets, totalCount] = await Promise.all([
    db.tweet.findMany({
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
      skip: (page - 1)*2,
      take: 2,
      orderBy: {
        created_at: "desc"
      }
    }),
    db.tweet.count(),
  ]);
  return {
    tweets,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function addTweet(prevState:TweetFormState, formData:FormData) {
  const tweet = formData.get("tweet")?.toString().trim();
  const session = await getSession();

  if (!session.id ) {
    throw new Error("로그인해야 트윗을 작성할 수 있습니다.");
  }

  if (!tweet) {
    throw new Error("메세지를 입력해주세요.");
  }

  await db.tweet.create({
    data: {
      tweet,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
  });
  return { success: true };
}