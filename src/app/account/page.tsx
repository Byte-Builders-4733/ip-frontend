'use client'

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";

export default function Account() {
	return <>
		<Header />
		<main className="container text-center">
			<h1 className="text-2xl font-semibold my-8">{localStorage.getItem('username')}</h1>
			<div className="border-2 border-shadow rounded-2xl w-80 py-4 mx-auto">
				<h2>Тестов пройдено: {localStorage.getItem('testCount')}</h2>
			</div>

			<div className="flex w-10/12 mx-auto text-left mt-10">
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
		</main>
	</>
}