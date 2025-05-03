"use client";

import { addTweet } from "@/app/action";
import Button from "./Button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";

interface AddTweetProps {
  onTweetCreated: () => void;
}

const initialState = {
  message: "",
  success: false,
};

export default function AddTweet({ onTweetCreated }: AddTweetProps) {
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
    <form ref={formRef} action={formAction} className="flex flex-col w-full max-w-xl mx-auto mb-8 gap-5">
      <textarea name="tweet" id="tweet" className="w-full p-4 border rounded-md resize-none">
      </textarea>
      <Button text="Add Tweet" />
    </form>
  );
}