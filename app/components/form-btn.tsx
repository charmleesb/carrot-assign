"use client";   // 버튼이 interactive 함

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  loading: boolean;
  text: string;
}
export default function FormBtn({loading, text}:FormButtonProps) {
  const { pending } =  useFormStatus(); // form 의 자식요소에만
  return (
    <button disabled={pending} className="primary-btn">{pending? "Loading..." : text}</button>
  )
}