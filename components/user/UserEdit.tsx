"use client";

import { updateUserInfos } from "@/app/users/[username]/edit/actions";
import Input from "@/components/common/Input";
import Link from "next/link";
import { useFormState } from "react-dom";

type UserEditInfo = {
  username: string;
  email: string;
  bio: string | null;
  password: string;
};

export default function UserEdit({ infos }: { infos: UserEditInfo }) {
  const [state, dispatch] = useFormState(updateUserInfos, {
    fieldErrors: {},
    success: false,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full border-b-2 pb-2 border-neutral-300">
        <span className="text-lg font-bold">프로필 수정</span>
        <div className="flex gap-1">
          <Link href={`/users/${infos.username}`} className="bg-white border border-neutral-400 text-black py-1.5 px-4 rounded-full text-sm hover:bg-neutral-200 transition">취소</Link>
          <button type="submit" form="edit-form" className="bg-black text-white py-1.5 px-4 rounded-full text-sm hover:bg-neutral-700 transition">저장</button>
        </div>
      </div>
      <form id="edit-form" action={dispatch} className="flex flex-col gap-3 w-full">
        <Input className="px-10 bg-white" name="username" type="text" required errors={state?.fieldErrors?.username} defaultValue={infos.username} placeholder="Username" icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        </svg>} />
        <Input className="px-10 bg-white" name="email" type="email" required errors={state?.fieldErrors?.email} defaultValue={infos.email} placeholder="Email" icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
        </svg>} />
        <div className="flex w-full gap-2">
          <label className="cursor-pointer w-full ">
            <input type="radio" name="bio" value="M" defaultChecked={infos.bio === "M"} className="hidden peer" />
            <div className="text-center w-full px-4 py-2 rounded-full border transition peer-checked:bg-sky-700 peer-checked:text-white">
              남성
            </div>
          </label>
          <label className="cursor-pointer w-full">
            <input type="radio" name="bio" value="F" defaultChecked={infos.bio === "F"} className="hidden peer" />
            <div className="text-center w-full px-4 py-2 rounded-full border transition peer-checked:bg-sky-700 peer-checked:text-white">
              여성
            </div>
          </label>
        </div>
        <Input className="px-10 w-full bg-white" name="password" type="password" required errors={state?.fieldErrors?.password} defaultValue="" placeholder="Change Password" icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
        </svg>} />
        <Input className="px-10 w-full bg-white" name="confirmPassword" type="password" required errors={state?.fieldErrors?.confirmPassword} defaultValue="" placeholder="Confirm Password" icon={<svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
        </svg>} />
      </form>
    </div>
  )
}