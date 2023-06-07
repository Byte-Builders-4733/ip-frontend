import { ChangeEventHandler } from "react";


export default function Input({ placeholder, id, name, className, required=false, onChange=undefined, type='text' }
		: { placeholder: string, id?: string, name?:string, className?:string, required?:boolean, onChange?:ChangeEventHandler<HTMLInputElement>, type?: 'search' | 'text' | 'email' | 'password' }) {
	return <input type={type} id={id} name={name} className={`block p-4 text-sm
		text-gray-900 border border-gray-300 rounded-2xl bg-gray-5
		focus:ring-shadow focus:border-shadow focus:outline-none shadow ${className}`}
		placeholder={placeholder} required={required} onChange={onChange} />
}