"use client";

import { useState } from "react";
import { addTweet } from "@/app/action";

export default function AddTweet({ onTweetCreated }: { onTweetCreated?: () => void }) {
  const [tweet, setTweet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tweet.trim().length === 0) return;

    setIsSubmitting(true);
    await addTweet(tweet);
    setTweet("");
    setIsSubmitting(false);

    onTweetCreated?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl mx-auto mb-8">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full p-4 border rounded-md resize-none"
        rows={4}
        placeholder="Add Tweet ..."
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || tweet.trim().length === 0}
        className="mt-3 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:opacity-50"
      >
        {isSubmitting ? "작성 중..." : "트윗 작성"}
      </button>
    </form>
  );
}