"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, {
  fieldErrors: {},
  success: false,
});
  return (
    <div className="flex min-h-screen w-full py-32">
      <div className="flex flex-col items-center w-full gap-14">
        <div>
          <div className="w-10 y-10">
          <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
          </svg>
          </div>
        </div>
        <form action={dispatch} className="flex flex-col gap-5 w-full">
          <Input name="email" type="email" placeholder="Email" defaultValue="" required errors={state?.fieldErrors?.email} />
          <Input name="username" type="text" placeholder="Username" defaultValue="" required minLength={3} maxLength={10} errors={state?.fieldErrors?.username} />
          <Input name="password" type="password" placeholder="Password" defaultValue="" required  minLength={4} errors={state?.fieldErrors?.password} />
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" defaultValue="" required  minLength={4} errors={state?.fieldErrors?.confirmPassword} />
          <Button text="Create Account" />
        </form>
      </div>
    </div>
  )
}