"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function likePost(tweetId:number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      }
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.log(e);
  }
};

export async function dislikePost(tweetId:number) {
  const session = await getSession();

  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        }
      }
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.log(e);
  }
};

export async function getComments(tweetId:number) {
  const comments = await db.comment.findMany({
    where: {
      tweetId
    },
    select: {
      comment: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true
        }
      },
    },
    orderBy: {
      created_at: "desc"
    }
  });

  return comments;
}

const commentSchema = z.object({
  comment: z.string().min(1, { message: "댓글을 입력해주세요." }).max(100),
  tweetId: z.number()
});

export async function addComment(comment:string, tweetId:number) {
  const session = await getSession();

  if (!session.id) {
    throw new Error("로그인 ㄴㄴ");
  } 
  
  if (!comment) {
    throw new Error("답글 입력하세요");
  }

  const result = await commentSchema.spa({comment: comment, tweetId: tweetId});

  if (!result.success) {
    throw new Error(result.error.flatten().fieldErrors.comment?.[0] || "잘못된 입력입니다.");
  }
  await db.comment.create({
    data: {
      comment,
      user: {
        connect: {
          id: session.id
        }
      },
      tweet: {
        connect: {
          id: tweetId
        }
      }
    }
  });
  
  revalidateTag(`comments-${tweetId}`);
}