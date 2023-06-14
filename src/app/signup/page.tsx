'use client'
import { useState } from 'react';
import Header from '@/components/Header';
import Dude from '@/components/Dude';
import Input from '@/components/Input';
import Button from '@/components/Button'

export default function Signup() {
	const [emailError, setEmailError] = useState<string>()
	const [usernameError, setUsernameError] = useState<string>()
	const [passwordError, setPasswordError] = useState<string>()

	const onFormSubmit = (e: any) => {
		e.preventDefault();

		const url = new URL('/auth/users/', process.env.API)

		const data = new FormData(e.target);

		const get_user = async () => {
			const url = new URL('/auth/users/me/', process.env.API);

			const req = await fetch(url);
			const data = await req.json();
			return [data.email, data.username];
		}

		fetch(url, {
			method: 'POST',
			body: data
		})
			.then(res => res.json())
			.then(async res => {
				if (res.id) {
					window.location.href = '/';
					return;
				}

				setEmailError(res.email ? res.email[0] : '');
				setUsernameError(res.username ? res.username[0] : '');
				setPasswordError(res.password ? res.password[0] : '');
			})
	}

	return <>
		<Header />
		<main className="container text-center">
			<Dude />
			<h1 className="text-3xl font-semibold py-8">Войдите в свой профиль</h1>

			<form className="w-10/12 mx-auto" onSubmit={onFormSubmit}>
				<Input className={`w-full mt-4 transition-all duration-100 ${emailError ? 'border-red-700': ''}`} name="email" placeholder="Электронная почта" type="email" required />
				<span className="input-error">{emailError}</span>
				<Input className={`w-full mt-4 transition-all duration-100 ${usernameError ? 'border-red-700': ''}`} name="username" placeholder="Логин" required />
				<span className="input-error">{usernameError}</span>
				<Input className={`w-full mt-4 transition-all duration-100 ${passwordError ? 'border-red-700': ''}`} name="password" placeholder="Пароль" type="password" required />
				<span className="input-error">{passwordError}</span>
				<Button type="submit" className="!text-lg !px-16 my-8">Зарегестрироваться</Button>
			</form>
		</main>
	</>
}