import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
	const [localToken, setLocalToken] = useState('');
	const [localUsername, setLocalUsername] = useState('');

	useEffect(() => {
		setLocalToken(window.localStorage.getItem('auth_token')!);
		setLocalUsername(window.localStorage.getItem('username')!);
	}, [setLocalToken, setLocalUsername])

	return <header className="main-header sticky top-0 bg-white z-10">
		<div className="container py-8 flex items-center justify-between">
			<Link href="/">
				<div className="logo flex items-center gap-4">
					<Image src="/img/logo-black.png" width="110" height="40" alt="Logo" />
					<span className="text-sm">Art of research & development</span>
				</div>
			</Link>
			<nav className="navbar flex gap-10 font-bold uppercase text-sm">
				<Link href="test" className="hover:underline hover:text-zinc-600">Тест</Link>
				
				{!localToken && <>
					<Link href="signup" className="hover:underline hover:text-zinc-600">Регистрация</Link>
					<Link href="login" className="hover:underline hover:text-zinc-600">Вход</Link>
				</>}
				{localToken &&
					<Link href="account" className="hover:underline hover:text-zinc-600">{localUsername}</Link>
				}
				
			</nav>
		</div>
	</header>
}