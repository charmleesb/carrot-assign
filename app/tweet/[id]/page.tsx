import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import LikeButton from "@/components/tweet/LikeButton";
import getSession from "@/lib/session";
import CommentList from "@/components/tweet/comment-list";
import { getComments } from "./actions";

async function getTweet(id:number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          bio: true
        }
      }
    }
  });
  return tweet;
}

async function getUsername(id:number) {
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      username: true
    }
  });
  if (user) {
    return user.username;
  }
};

async function getLikeStatus(tweetId:number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      }
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId
    }
  });

  return {
    likeCount, isLiked: Boolean(isLiked)
  }
};

export default async function TweetDetail({params,}:{params: {id:string}}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const {likeCount, isLiked} = await getLikeStatus(id);
  const comments = await getComments(id);
  const session = await getSession();
  const username = (await getUsername(Number(session.id))) ?? "";;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col bg-sky-100 max-h-[300px] p-5">
        <div className="flex justify-between items-center border-b border-neutral-400 pb-2">
          <span className="text-xl">{tweet.user.username}</span>
          <div className="w-5 h-5 bg-sky-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">{tweet.user.bio}</span>
          </div>
        </div>
        <span className="py-10">{tweet.tweet}</span>
        <div className="flex justify-between items-center">
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
          <span className="text-right text-sm text-neutral-500">{formatToTimeAgo(tweet.created_at.toString())}</span>
        </div>
      </div>
      <CommentList initialComments={comments} tweetId={id} username={username} />
    </div>
  );
}