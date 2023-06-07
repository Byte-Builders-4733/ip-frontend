import { ChangeEventHandler } from "react";

export default function TextInput({ placeholder, id, className, required=false, onChange=undefined, ...rest }
		: { placeholder: string, id?: string, className?:string, required?:boolean, onChange?:ChangeEventHandler<HTMLInputElement> }) {
	return <input type="search" id={id} className={`block p-4 text-sm
		text-gray-900 border border-gray-300 rounded-2xl bg-gray-5
		focus:ring-shadow focus:border-shadow focus:outline-none shadow ${className}`}
		placeholder={placeholder} required={required} onChange={onChange} {...rest} />
}