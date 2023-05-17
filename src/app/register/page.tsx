// import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Dude from '@/components/Dude';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button'
// import Link from 'next/link';

export default function Register() {
	return <>
		<Header />
		<main className="container text-center">
			<Dude />
			<h1 className="text-3xl font-semibold py-8">Войдите в свой профиль</h1>

			<form className="w-10/12 mx-auto">
				<TextInput placeholder="Электронная почта" className="w-full m-6" />
				<TextInput placeholder="Логин" className="w-full m-6" />
				<TextInput placeholder="Пароль"className="w-full m-6" />
				<Button className="!text-lg !px-16">Зарегестрироваться</Button>
			</form>
		</main>
	</>
}