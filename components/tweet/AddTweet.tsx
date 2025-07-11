"use client";

import { addTweet } from "@/app/actions";
import Button from "../common/Button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";

interface AddTweetProps {
  onTweetCreated: () => void;
}

const initialState = {
  fieldErrors: {},
  success: false,
};

export default function AddTweet({onTweetCreated }: AddTweetProps) {
  const [state, formAction] = useFormState(addTweet, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      onTweetCreated();
      state.success = false;
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col w-full max-w-xl mx-auto gap-3">
      <div>
        <textarea name="tweet" id="tweet" className="w-full p-4 border rounded-md resize-none">
        </textarea>
        <span className="text-red-500 font-medium block">{state?.errors?.tweet}</span>
      </div>
      <Button text="게시하기" />
    </form>
  );
}