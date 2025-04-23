interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  icon: React.ReactNode;
}

export default function FormInput({type, placeholder, required, errors = [], name, icon}:FormInputProps) {
  return (
    <div className="relative">
      {icon && (
        <i className="w-5 h-5 absolute left-3 top-6 -translate-y-1/2 text-neutral-400 pointer-events-none">
          {icon}
        </i>
      )}
      <input className="bg-neutral-100 h-12 w-full outline-none rounded-lg px-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-sky-700 border-none placeholder:text-neutral-400 transition" name={name} type={type} placeholder={placeholder} required={required} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 pt-3 font-medium block">{error}</span>
      ))}
    </div>
  )
}