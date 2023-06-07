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

export default function Test() {
	const [questions, setQuestions] = useState<IQuestion[]>();
	const [questionss, setQuestionss] = useState<IQuestion[]>();
	const rightCount = useRef(0);
	const totalCount = useRef(0);
	const [displayButtonNext, setDisplayButtonNext] = useState(false);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const url = new URL('/api/v1/tests/', process.env.API)
		url.searchParams.append('format', 'json')
		fetch(url, {cache: 'no-store'})
			.then(res => res.json())
			.then(res => setQuestions(res))
		// setQuestions([{
		// 	question: 'Ценности, принципы и правила взаимодействия команды для быстрой разработки программного обеспечения',
		// 	options: ['Аджайл', 'Гол', 'Дикшинари'],
		// 	right: 0,
		// },
		// {
		// 	question: 'Ценности, принципы и правила взаимодействия команды для быстрой разработки программного обеспечения',
		// 	options: ['Аджайл', 'Гол', 'Дикшинари'],
		// 	right: 0,
		// }])
	}, [setQuestions])

	

	const toggleDisplayButtonNext = () => { setDisplayButtonNext(!displayButtonNext) }

	const onPick = (rightPick: boolean) => {
		rightCount.current = rightCount.current + Number(rightPick);
		totalCount.current = totalCount.current + 1;

		if (totalCount.current !== questions!.length)
			toggleDisplayButtonNext();
		else{
			// hack
			localStorage.setItem('testCount', (Number(localStorage.getItem('testCount')) + 1).toString())
			setDone(true);}
	}

	return <>
		<Header />
		<main className="container text-center">
			<Image className="mt-10 mx-auto" src="/img/test.png" alt="" width={261} height={151} />
			<p className="mt-4">{rightCount.current} / {totalCount.current} правильных ответов</p>

			<Swiper
				allowTouchMove={false}>
				{questions && questions.map((question, i) =>
					<SwiperSlide key={i}>
						<Question questionNumber={i} question={question} onPick={onPick} />
						{/* </div> */}
						<SwiperButton shown={displayButtonNext} onClick={toggleDisplayButtonNext} />
					</SwiperSlide>
				)}
			</Swiper>

			{done &&
				<div className="my-5 flex gap-8 justify-center">
					<Button onClick={tryRefresh}>Ещё тест</Button>
					{/* <Button onClick={() => { () => {()} }}>Ещё тест</Button> */}
					<Button dark href="/">На главную</Button>
				</div>
			}
		</main>
	</>
}