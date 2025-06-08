"use client";

import AddComment from "./AddComment";
import Comment from "../comment";
import { addComment, getComments } from "@/app/tweet/[id]/actions";
import { useOptimistic, useState } from "react";

interface CommentType {
  id: number;
  comment: string;
  created_at: Date;
  user: {
    username: string;
  };
}

interface CommentListProps {
  tweetId: number;
  initialComments: CommentType[];
  username: string;
}


export default function CommentList({ initialComments, tweetId, username }: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);;
  const [optimisticComments, addOptimisticComment] = useOptimistic<CommentType[], string>(
    comments,
    (prev, newCommentText) => [
      {
        id: Date.now(),
        comment: newCommentText,
        created_at: new Date(),
        user: {
          username: username
        },
      },
      ...prev,
    ]
  );
  
  const handleAddComment = async(text:string) => {
    addOptimisticComment(text);
    await addComment(text, tweetId);
    const updated = await getComments(tweetId); 
    setComments(updated);
  }

  return (
    <div>
      <AddComment tweetId={tweetId} onAddComment={handleAddComment} />
      <div className="w-full py-3">
        <span className="font-bold text-2xl">Comments</span>
      </div>
      <div className="flex flex-col gap-4">
      {optimisticComments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      </div>
    </div>
  )
}