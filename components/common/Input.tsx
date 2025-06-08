import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
  icon?: React.ReactNode;
  className?: string;
  defaultValue: string;
}

export default function Input({errors = [], name, className = "", icon, defaultValue="", ...rest}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      {icon && (
        <i className="w-5 h-5 absolute left-3 top-6 -translate-y-1/2 text-neutral-400 pointer-events-none">
          {icon}
        </i>
      )}
      <input name={name} defaultValue={defaultValue} className={`bg-neutral-100 h-12 w-full rounded-full ring-1 focus:ring-2 ring-neutral-200 focus:ring-sky-700 border-none placeholder:text-neutral-400 outline-none ${icon ? "pl-10" : "px-4"} ${className}`} {...rest} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 pt-3 font-medium block">{error}</span>
      ))}
    </div>
  )
}