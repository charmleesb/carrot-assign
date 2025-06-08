"use client";

import { useRef } from "react";

interface AddCommentProps {
  errors?: string[];
  tweetId: number;
  onAddComment: (comment: string) => void;
}

export default function AddComment({ tweetId, onAddComment, errors = [] }: AddCommentProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const comment = ref.current?.value.trim();
    if (!comment) return;
    onAddComment(comment);
    ref.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <input type="hidden" name="tweetId" value={tweetId} />
      <textarea ref={ref} name="comment" id="comment" className="w-full p-4 border rounded-md resize-none">
      </textarea>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 pt-3 font-medium block">{error}</span>
      ))}
      <div className="flex justify-end w-full">
        <button type="submit" className="primary-btn px-3 h-8 text-sm">Comment</button>
      </div>
    </form>
  )
}