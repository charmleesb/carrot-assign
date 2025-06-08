import { formatToTimeAgo } from "@/lib/utils"
import Link from "next/link"

interface ListTweetProps {
  tweet: string,
  created_at: Date,
  id: number,
  user: {
    username: string
  }
}
export default function ListTweet({tweet, created_at, id, user}: ListTweetProps) {
  return (
    <Link href={`/tweet/${id}`} className="flex flex-col gap-4 bg-sky-100 rounded-md p-5 text-black hover:bg-sky-200 transition">
      <div className="flex flex-col gap-2">
        <span className="text-xl">{tweet}</span>
        <span className="text-md text-neutral-500">{user.username}</span>
      </div>
      <span className="text-sm text-right text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
    </Link>
  )
}