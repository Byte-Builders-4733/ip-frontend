import { ReactNode } from "react";

export default function Button({ dark=false, type="submit", className, children }
		: { dark?:boolean, type?: "submit" | "button", className?: string, children: ReactNode }) {

	let colors: string;

	if (!dark) {
		colors = 'text-shadow hover:bg-zinc-300 bg-white border-2 border-black';
	} else {
		colors = 'text-white hover:bg-zinc-600 bg-shadow'
	}
	
	return  <button type={type} className={`${colors} inline-block
		focus:ring-4 focus:outline-none focus:ring-blue-300
		font-medium rounded-2xl text-sm px-4 py-2 shadow ${className}`}
	>{children}</button>;
}