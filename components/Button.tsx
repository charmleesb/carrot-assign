"use client";   // 버튼이 interactive 함

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}
export default function Button({text}:ButtonProps) {
  const { pending } =  useFormStatus();
  return (
    <button disabled={pending} className="primary-btn">{pending? "Loading..." : text}</button>
  )
}