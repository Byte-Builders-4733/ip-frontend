export default function TextInput({ placeholder, id, className, required=false, ...rest }
		: { placeholder: string, id?: string, className?:string, required?:boolean }) {
	return <input type="search" id={id} className={`block p-4 text-sm
		text-gray-900 border border-gray-300 rounded-2xl bg-gray-5
		focus:ring-shadow focus:border-shadow focus:outline-none shadow ${className}`}
		placeholder={placeholder} required={required} {...rest} />
}