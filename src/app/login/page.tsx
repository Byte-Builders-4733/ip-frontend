'use client'

import Header from '@/components/Header';
import Dude from '@/components/Dude';
import Input from '@/components/Input';
import Button from '@/components/Button'
import { useState } from 'react';

export default function Login() {
	const [error, setError] = useState<string>()

	const onFormSubmit = (e: any) => {
		e.preventDefault();

		const url = new URL('/auth/token/login/', process.env.API)

		const data = new FormData(e.target);

		const get_user = async (token: any) => {
			const url = new URL('/auth/users/me/', process.env.API)
			const headers = new Headers();
			headers.append('Authorization', `Token ${token}`)

			const req = await fetch(url, {
				headers: headers,
			});
			const data = await req.json();
			return [data.email, data.username];
		}

		fetch(url, {
			method: 'POST',
			body: data
		})
			.then(res => res.json())
			.then(async res => {
				if (res.auth_token) {
					localStorage.setItem('auth_token', res.auth_token);
					const [email, username] = await get_user(res.auth_token);
					localStorage.setItem('email', email);
					localStorage.setItem('username', username);

					window.location.href = '/';
					return;
				}

				setError(res.non_field_errors)
			})
	}

	return <>
		<Header />
		<main className="container text-center">
			<Dude />
			<h1 className="text-3xl font-semibold py-8">Войдите в свой профиль</h1>

			<form className="w-10/12 mx-auto" onSubmit={onFormSubmit}>

				<Input className={`w-full mt-4 transition-all duration-100 ${error ? 'border-red-700': ''}`} name="email" placeholder="Электронная почта" type="email" required />
				<span className="input-error"></span>
				<Input className={`w-full mt-4 transition-all duration-100 ${error ? 'border-red-700': ''}`} name="password" placeholder="Пароль" type="password" required />
				<span className="input-error">{error}</span>
				<Button className="!text-lg !px-16 my-8">Войти</Button>
			</form>
		</main>
	</>
}