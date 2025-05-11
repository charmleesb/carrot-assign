"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SearchForm({ defaultValue }: {defaultValue: string}) {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("searchQuery")?.toString().trim();
    if (query) {
      router.push(`/search?q=${query}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <button>
        <i className="w-4 h-4 absolute left-3 top-4 -translate-y-1/2 text-neutral-400 pointer-events-none">
          <MagnifyingGlassIcon className="size-4" />
        </i>
      </button>
    <input name="searchQuery" defaultValue={defaultValue ?? ""} placeholder="검색" className="h-8 w-full text-sm rounded-full ring-1 focus:ring-2 ring-neutral-200 focus:ring-sky-700 border-none placeholder:text-neutral-400 outline-none pl-8" />
  </form>
  )
}