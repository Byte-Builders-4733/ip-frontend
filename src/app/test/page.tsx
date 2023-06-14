"use client"

import { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Header from '@/components/Header';
import Image from 'next/image';
import Question from '@/components/Question';
import Button from '@/components/Button';
import { IQuestion } from '@/lib/types'
import { tryRefresh } from '@/lib/utils';
import SwiperButton from '@/components/SwiperButton';
import Link from 'next/link';

export default function Test() {
	const [localToken, setLocalToken] = useState('');
	const [questions, setQuestions] = useState<IQuestion[]>();
	const rightCount = useRef(0);
	const totalCount = useRef(0);
	const [displayButtonNext, setDisplayButtonNext] = useState(false);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('auth_token');
		if (!token)
			return;

		setLocalToken(token);

		const url = new URL('/api/v1/tests/', process.env.API)
		url.searchParams.append('format', 'json')
		fetch(url, {cache: 'no-store'})
			.then(res => res.json())
			.then(res => setQuestions(res))
	}, [setQuestions])


	const toggleDisplayButtonNext = () => { setDisplayButtonNext(!displayButtonNext) }

	const onPick = (rightPick: boolean) => {
		rightCount.current = rightCount.current + Number(rightPick);
		totalCount.current = totalCount.current + 1;

		if (totalCount.current !== questions!.length)
			toggleDisplayButtonNext();
		else {
			const url = new URL('/testsucc/', process.env.API)

			const headers = new Headers();
			headers.append('Authorization', `Token ${localStorage.getItem('auth_token')}`);


			fetch(url, {
				method: 'PUT',
				headers: headers,
			});

			localStorage.setItem('testCount', (Number(localStorage.getItem('testCount')) + 1).toString())
			setDone(true);}
	}

	return <>
		<Header />
		{localToken && 
			<main className="container text-center">
				<Image className="mt-10 mx-auto" src="/img/test.png" alt="" width={261} height={151} />
				<p className="mt-4">{rightCount.current} / {totalCount.current} правильных ответов</p>

				<Swiper
					allowTouchMove={false}>
					{questions && questions.map((question, i) =>
						<SwiperSlide key={i}>
							<Question questionNumber={i} question={question} onPick={onPick} />
							<SwiperButton shown={displayButtonNext} onClick={toggleDisplayButtonNext} />
						</SwiperSlide>
					)}
				</Swiper>

				{done &&
					<div className="my-5 flex gap-8 justify-center">
						<Button onClick={tryRefresh}>Ещё тест</Button>
						<Button dark href="/">На главную</Button>
					</div>
				}
			</main>
		}

		{!localToken &&
			<main className="container text-center">
				<h1>Пожалуйста, <Link href="login" className="underline">войдите в аккаунт</Link></h1>
			</main>
		}
	</>
}