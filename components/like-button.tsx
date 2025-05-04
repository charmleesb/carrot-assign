"use client";

import { dislikePost, likePost } from "@/app/tweet/[id]/actions";
import { HeartIcon } from "@heroicons/react/24/solid"; // Solid 버전
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({isLiked, likeCount, tweetId}:LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({isLiked, likeCount}, (previousState, payload) => {
    return {
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked ? 
      previousState.likeCount - 1 : previousState.likeCount + 1,
    };
  });
  const onclick = async() => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  }
  return (
    <button onClick={onclick} className={`flex items-center gap-1 border border-neutral-400 p-1 rounded-md text-sm focus: hover:border-red-600 transition hover:bg-red-600 hover:text-white ${isLiked ? "border-red-600 text-red-600" : "border-neutral-400 text-neutral-400"}`}>
      <HeartIcon className="size-4"/>
      <span>{state.likeCount}</span>
    </button>
  )
}