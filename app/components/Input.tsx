import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
  icon?: React.ReactNode;
}

export default function Input({errors = [], name, ...rest}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      {rest.icon && (
        <i className="w-5 h-5 absolute left-3 top-6 -translate-y-1/2 text-neutral-400 pointer-events-none">
          {rest.icon}
        </i>
      )}
      <input className="bg-neutral-100 h-12 w-full outline-none rounded-lg px-5 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-sky-700 border-none placeholder:text-neutral-400 transition" {...rest} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 pt-3 font-medium block">{error}</span>
      ))}
    </div>
  )
}