"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

interface TweetFormState {
  errors?: string;
  success?: boolean;
}

export async function getMoreTweets(page:number, pageSize = 2) {
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

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: "내용을 입력해주세요."})
  .trim(),
});

interface TweetFormState {
  success?: boolean;
  tweet?: string[];
}

export async function addTweet(prevState:TweetFormState, formData:FormData): Promise<FormState>  {
  const session = await getSession();
  if (!session.id ) {
    throw new Error("로그인해야 트윗을 작성할 수 있습니다.");
  }

  const data = {
    tweet: formData.get("tweet")?.toString().trim()
  };

  const result = await tweetSchema.spa(data);

  if (!result.success) {
    console.log("Add Tweet Error");
    return {
      success: false,
      errors: result.error.flatten()
    };
  } else {
    await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
  }

  return { success: true };
}