"use client"

import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import Question from '@/components/Question';
import { IQuestion } from '@/lib/types'

export default function Test() {
	const [question, setQuestion] = useState<IQuestion>();

	useEffect(() => {
		setQuestion({
			question: 'Ценности, принципы и правила взаимодействия команды для быстрой разработки программного обеспечения',
			options: ['Аджайл', 'Гол', 'Дикшинари'],
			right: 0,
		})
	}, [setQuestion])

	return <>
		<Header />
		<main className="container text-center">
			<Image className="mt-10 mx-auto" src="/img/test.png" alt="" width={261} height={151} />

			{question && <Question question={question} />}
		</main>
	</>
}