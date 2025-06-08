import { getMoreTweets } from "@/app/actions";
import TweetList from "@/components/tweet/TweetList";
export const revalidate = 0;

export default async function Home() {
  const {tweets, totalPages} = await getMoreTweets(1);

  return (
    <>
      <TweetList initialTweets={tweets} initialTotalPages={totalPages} />
    </>
  )
}