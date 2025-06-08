import { formatToTimeAgo } from "@/lib/utils"

interface CommentProps {
  comment: string,
  created_at: Date,
  user: {
    username: string
  }
}

export default function Comment({comment, created_at, user}: CommentProps) {
  return (
    <div className="flex flex-col gap-2 px-5 py-3 text-black bg-neutral-100 rounded-md">
      <span className="text-xl">{user.username}</span>
      <span className="text-sm">{comment}</span>
      <span className="text-xs text-right text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
    </div>
  )
}