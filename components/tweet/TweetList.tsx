"use client";

import ListTweet from "./ListTweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/actions";
import AddTweet from "./AddTweet";
import SearchForm from "../search/SearchForm";

export type InitialTweets = Awaited<ReturnType<typeof getMoreTweets>>["tweets"];

interface TweetListProps {
  initialTweets: InitialTweets;
  initialTotalPages: number;
}

export default function TweetList({ initialTweets, initialTotalPages }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const visiblePages = 5;

  const changePage = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setIsLoading(true);

    const { tweets: newTweets, totalPages: newTotalPages } = await getMoreTweets(newPage);

    if (newTweets.length === 0) {
    } else {
      setTweets(newTweets);
      setTotalPages(newTotalPages);
      setPage(newPage);
      setIsLoading(false);
    }
  };
  
  const refreshTweets = async () => {
    const {tweets: latest, totalPages: newTotalPages } = await getMoreTweets(1);
    setTweets(latest);
    setTotalPages(newTotalPages);
    setPage(1);
  };

  const start = Math.max(1, page - Math.floor(visiblePages / 2));
  const end = Math.min(totalPages, start + visiblePages - 1);

  return (
    <div className="flex flex-col gap-10 w-full">
      <AddTweet onTweetCreated={refreshTweets} />
      <div className="flex flex-col gap-4">

        <SearchForm defaultValue=""/>
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
        <div className="flex justify-center gap-3 text-2xl">
          <button onClick={() => changePage(page - 1)} disabled={page === 1 || isLoading} className={page === 1 ? "invisible" : ""}>＜</button>
          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((num) => (
            <button
              key={num}
              onClick={() => changePage(num)}
              disabled={isLoading}
              className={`w-10 h-10 text-center ${page === num ? "font-bold text-sky-500" : ""}`}
            >
              {num}
            </button>
          ))}
          <button onClick={() => changePage(page + 1)} disabled={page === totalPages || isLoading}className={page === totalPages ? "invisible" : ""}>＞</button>
        </div>
      </div>
    </div>
  );
}