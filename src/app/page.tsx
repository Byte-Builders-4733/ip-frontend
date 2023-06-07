"use client";

import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Link from 'next/link';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

export default function Index() {
	const [words, setWords] = useState<{term: string, definition: string}[]>([]);
	const [displayTable, setDisplayTable] = useState<boolean>(false);
	const charsRu = ['А','Б','В','Г','Д','Е','Ж','З','И','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я'];
	const charsEn = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	const [displayAlphabet, setDisplayAlphabet] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('');
	const [error, setError] = useState<any>();
	const [x, setX] = useState<any>();

	useEffect(() => {
		updateWordList();
	}, [setWords])

	const updateWordList = (c = '') => {
		const url = new URL(c ? `/api/${c}/` : '/api/v1/words/', process.env.API!);
		url.searchParams.append('format', 'json')
		fetch(url, {cache: 'force-cache'})
			.catch(err => {setDisplayTable(false); setError(err)})
			.then(res => res ? res.json(): null)
			.then(res => {
				if (res && res.length) {
					setWords(res);
					setDisplayTable(true);
				} else
					setDisplayTable(false);
			})
	}

	const onSearchChange = (e: any) => {
		setSearchValue(e.target.value);
	}

	return <>
		<Header />


		<main className="container text-center">
			<h1 className="text-7xl mt-20 pb-8">IT-Dictionary</h1>
			<h2 className="text-3xl">Расширьте свой словарный запас компьютерной терминологии</h2>


			<form className="search mx-auto relative my-10 w-10/12" onKeyDown={e => {if (e.key == 'Enter'){ e.preventDefault(); updateWordList(searchValue)}}}>
				<div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
					<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
				</div>

				<TextInput id="search" className="w-full pl-14" placeholder="Введите название термина" onChange={onSearchChange} />

				<Button type='button' className="absolute right-0 bottom-0 h-full" onClick={() => updateWordList(searchValue)} dark>Поиск</Button>
				{/* <button type="submit" className="text-white absolute right-0 bottom-0
					hover:bg-zinc-600
					bg-shadow
					h-full
					focus:ring-4 focus:outline-none focus:ring-blue-300
					font-medium rounded-2xl text-sm px-4 py-2"
				>Поиск</button> */}
			</form>
			
			<p className="font-semibold mb-6">Узнайте особенности IT сленга</p>


			<Button onClick={() => {setDisplayAlphabet(!displayAlphabet)}}>{!displayAlphabet ? 'Показать алфавит' : 'Спрятать алфавит'}</Button>
			{displayAlphabet &&
				<div className="w-10/12 mx-auto mt-4">
					{[{chars: charsRu, lang: 'ru'}, {chars: charsEn, lang: 'en'}].map(({chars, lang} : {chars: string[], lang: string}) => 
						<p key={lang} id={lang} className="flex flex-wrap justify-center">
							{chars.map((c, i) =>
								<Link href="" key={i} className="inline-block text-2xl px-2.5 underline hover:no-underline hover:text-zinc-600" onClick={() => updateWordList(c)}>{c}</Link>
							)}
						</p>
					)}
					{/* <p className="flex flex-wrap justify-center">
						{charsEn.map((c, i) =>
							<Link href="" key={i} className="inline-block text-2xl px-2 underline hover:no-underline hover:text-zinc-600" onClick={() => updateWordList(c)}>{c}</Link>
						)}
					</p> */}
				</div>
			}

			{displayTable &&
			<div className="table-b w-10/12 mx-auto mt-12 border-4 border-black border-separate rounded-2xl overflow-hidden table">
				<table className={`w-full text-left `}>
					<tbody>
						{words.map((w, i) =>
							<tr key={i} className={`${i & 1 ? 'bg-gray-100' : 'q'}`}>
								<td className="py-5 px-5 font-medium">{w.term}</td>
								<td className="py-5 px-5">{w.definition}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			}
			{!displayTable && error &&
				<p>{error.toString()}</p>
			}
			{!displayTable && !error &&
				<p className="mt-4 py-2 px-5 text-lg inline-block  bg-red-100 ">Ничего нет :(</p>
			}

			<div className="w-10/12 text-left my-10">
				<h2 className="font-semibold text-2xl">
					IT-словарь: понимайте термины и язык<br />
					программирования легко и быстро
				</h2>

				<p className="mt-4 text-lg">
					Мы создали этот сайт, чтобы помочь новичкам лучше понимать терминологию и язык,
					используемые в мире разработки. Мы собрали большой список терминов, объединив их в
					различные темы, для вашего удобства
				</p>
			</div>
		</main>
	</>
}