"use client";

import { updateUserInfos } from "@/app/users/[username]/edit/actions";
import Input from "@/components/Input";
import { useFormState } from "react-dom";

type UserEditInfo = {
  username: string;
  email: string;
  bio: string | null;
  password: string;
};

export default function UserEdit({ infos }: { infos: UserEditInfo })  {
  const [state, dispatch] = useFormState(updateUserInfos, null);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full border-b-2 pb-2 border-neutral-300">
        <span className="text-lg font-bold">프로필 수정</span>
        <button type="submit" form="edit-form" className="bg-black text-white py-1.5 px-4 rounded-full text-sm hover:bg-neutral-700 transition">저장</button>
      </div>
      <form id="edit-form" action={dispatch} className="flex flex-col gap-3">
        <Input className="px-10" name="username" type="text" defaultValue={infos.username} placeholder="Username" required icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        </svg>}/>
        <Input className="px-10" name="email" type="email" defaultValue={infos.email} placeholder="Email" required icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
        </svg>}/>
        <Input className="px-10" name="password" type="password" defaultValue={infos.password} placeholder="Password" required icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
        </svg>}/>
      </form>
    </div>
  )
}