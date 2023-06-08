'use client'

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useState, useEffect, MouseEventHandler } from "react";
import Link from "next/link";

export default function Account() {
	const [localToken, setLocalToken] = useState('');
	const [localUsername, setLocalUsername] = useState('');
	const [localTestCount, setLocalTestCount] = useState('0');
	const [logout, setLogout] = useState<Function>();
	
	const [modalShown, setModalShown] = useState(false);

	// let logout: Function;

	useEffect(() => {
		setLocalToken(window.localStorage.getItem('auth_token')!);
		setLocalUsername(window.localStorage.getItem('username')!);
		setLocalTestCount(window.localStorage.getItem('testCount')!);

		setLogout(() => {
			window.localStorage.removeItem('auth_token');
			window.localStorage.removeItem('username');
			window.localStorage.removeItem('testCount');
			window.location.href = '/';
		})
	}, [setLocalToken, setLocalUsername, setLocalTestCount])

	return <>
		<Header />
		{localToken &&
			<main className="container text-center">
				<h1 className="text-2xl font-semibold my-8">{localUsername}</h1>
				<div className="border-2 border-shadow rounded-2xl w-80 py-4 mx-auto">
					<h2>Тестов пройдено: {localTestCount}</h2>
				</div>

				<div className="flex w-10/12 mx-auto text-left my-10">
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
				</div>
				<div className="text-left w-10/12 mx-auto">
					<Link href="" className="text-left" onClick={e => {e.preventDefault(); setModalShown(true)}}>Выйти</Link>
				</div>
				<Modal shown={modalShown} onOverlayClick={() => setModalShown(false)}>
					<p className="mb-4">Вы действительно хотите выйти?</p>
					<Button onClick={logout as MouseEventHandler}>Да</Button>
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