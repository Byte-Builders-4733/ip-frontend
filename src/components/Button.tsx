import Link from "next/link";
import { ReactNode, MouseEventHandler } from "react";

export default function Button({ dark=false, type="submit", className, href, children, onClick }
		: { dark?:boolean, type?: "submit" | "button", className?: string, href?: string, children: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement> }) {

	let colors: string;

	if (!dark) {
		colors = 'text-shadow hover:bg-zinc-300 bg-white border-2 border-black';
	} else {
		colors = 'text-white hover:bg-zinc-600 bg-shadow'
	}

	const finalClassName = `${colors} inline-block
		focus:ring-4 focus:outline-none focus:ring-blue-300
		font-medium rounded-2xl text-sm px-4 py-2 shadow ${className}`;
	


	return href ?
		<Link href={href} className={finalClassName}>{children}</Link>
		: <button type={type} className={finalClassName} onClick={onClick}>{children}</button>;
	
}