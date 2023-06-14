'use client'

import Button from "@/components/Button";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IUser } from "@/lib/types";

export default function Account() {
	const [localToken, setLocalToken] = useState('');
	const [user, setUser] = useState<IUser>();
	
	const [modalShown, setModalShown] = useState(false);

	const logout = () => {
		if (!window)
			return
		window.localStorage.removeItem('auth_token');
		window.location.href = '/';
	}

	useEffect(() => {
		const fetchUser = async (token: string)  => {
			const url = new URL('/auth/users/me/', process.env.API);
			const headers = new Headers();
			headers.append('Authorization', `Token ${token}`);

			const req = await fetch(url, {
				headers: headers,
			});
			const user = await req.json();
			return user;
		}

		const token = localStorage.getItem('auth_token')

		if (token) {
			setLocalToken(token!);

			(async () => {
				const user = await fetchUser(token);
				setUser(user);
			})();
		}
	}, [setLocalToken])

	return <>
		<Header />
		{localToken &&
			<main className="container text-center">
				<h1 className="text-2xl font-semibold my-8">{user?.username}</h1>
				<div className="border-2 border-shadow rounded-2xl w-80 py-4 mx-auto">
					<h2>Тестов пройдено: {user?.tests_count}</h2>
				</div>

				{/* <div className="flex w-10/12 mx-auto text-left my-10">
					<div className="w-1/2">
						<span className="text-lg underline underline-offset-4 mb-4 inline-block">Сменить пароль</span>
						<Input className="w-10/12 mb-4" placeholder="Пароль" />
						<Input className="w-10/12 mb-4" placeholder="Новый пароль" />
						<Button dark>Сохранить</Button>
					</div>
					<div className="w-1/2">
						<span className="text-lg underline underline-offset-4 mb-4 inline-block">Сменить почту</span>
						<Input className="w-10/12 mb-4" placeholder="Электронная почта" />
						<Input className="w-10/12 mb-4" placeholder="Новая электронная почта" />
						<Button dark>Сохранить</Button>
					</div>
				</div> */}
				<div className="text-center mt-8">
					<Link href="" className="text-left" onClick={e => {e.preventDefault(); setModalShown(true)}}>Выйти</Link>
				</div>
				<Modal shown={modalShown} onOverlayClick={() => setModalShown(false)}>
					<p className="mb-4">Вы действительно хотите выйти?</p>
					<Button onClick={logout}>Да</Button>
				</Modal>
			</main>
		}

		{!localToken &&
			<main className="container text-center">
				<h1>Пожалуйста, <Link href="login" className="underline">войдите в аккаунт</Link></h1>
			</main>
		}
	</>
}