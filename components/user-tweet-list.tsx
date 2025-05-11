"use client";

import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/actions";

export type InitialTweets = Awaited<ReturnType<typeof getMoreTweets>>["tweets"];

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function UserTweetList({ initialTweets }: TweetListProps) {
  const [tweets] = useState(initialTweets);
  return (
    <div className="flex flex-col gap-8 w-full">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}