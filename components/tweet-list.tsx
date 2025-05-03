"use client";

import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/action";
import AddTweet from "./add-tweet";
import { InitialTweets } from "./home";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const changePage = async (newPage: number) => {
    if (newPage < 1) return; // 1페이지보다 작은 건 못 가게
    setIsLoading(true);
  const { tweets: newTweets, totalPages } = await getMoreTweets(newPage);
    if (newTweets.length === 0) {
      setIsLastPage(true); // 마지막 페이지 도달
    } else {
      setTweets(newTweets);
      setPage(newPage);
      setIsLastPage(false);
    }

    setIsLoading(false);
  };
  
  const refreshTweets = async () => {
    const {tweets: latest } = await getMoreTweets(1);
    setTweets(latest);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-8">
      <AddTweet onTweetCreated={refreshTweets} />
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      <div className="flex justify-center gap-3 text-2xl">
        <button onClick={() => changePage(page - 1)} disabled={page === 1 || isLoading}>＜</button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => changePage(num)}
            disabled={isLoading}
            className={page === num ? "font-bold text-sky-500" : ""}
          >
            {num}
          </button>
        ))}
        <button onClick={() => changePage(page + 1)} disabled={isLastPage || isLoading}>＞</button>
      </div>
    </div>
  );
}