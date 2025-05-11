import SearchForm from "@/components/search-form";
import { getSearchTweets } from "./actions"
import ListTweet from "@/components/list-tweet";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const keyword = searchParams.q || "";
  const tweets = await getSearchTweets(keyword);
  console.log(tweets);
  return (
    <div className="flex flex-col gap-5">
      <SearchForm defaultValue={keyword} />
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  )
}