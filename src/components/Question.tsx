import { IQuestion } from "@/lib/types";
import { ChangeEvent, useState, useEffect } from "react";
import { shuffleArray } from '@/lib/utils';


export default function Question({question, questionNumber, onPick}: {question: IQuestion, questionNumber: number, onPick: Function}) {
	const [options, setOptions] = useState<string[]>([])
	const [rightIndex, setRightIndex] = useState<number>()
	
	const Colors = {
		'Normal': 'hover:bg-zinc-100 active:bg-zinc-200',
		'Right': 'bg-green-300',
		'Wrong': 'bg-red-300'
	}


	useEffect(() => {
		const _options = shuffleArray([
			question.correct_answer,
			question.uncorrect_answer1,
			question.uncorrect_answer2,
		]) as string[]
		setOptions(_options);
		setRightIndex(_options.indexOf(question.correct_answer));
	}, [question, setOptions, setRightIndex])


	const [userAnswer, setUserAnswer] = useState<any>('');

	const name = 'test-' + questionNumber;
	const getOptionName = (i: number) => `option-${questionNumber}-${i}`

	const onSelect = (e: ChangeEvent) => {
		if (userAnswer)
			return

		const answerElement = e.target as HTMLInputElement;
		const result = Number(answerElement.value);

		onPick(result === rightIndex);
		setUserAnswer(result);
	}


	return <div>
		<p className="text-2xl mb-8 mt-5">{question.question}</p>
		<form name={name} id={name}>
			{ options.map((option, i) =>
				<div className="w-full" key={i}>
					<input className="hidden peer"
						onChange={onSelect}
						type="radio" value={i} id={getOptionName(i)} name={name} key={i} disabled={userAnswer !== ''} />

					<label className={`w-10/12 inline-block my-2.5 py-2 text-2xl rounded-2xl border-2 border-shadow shadow cursor-pointer
					                  ${i === userAnswer ? (i === rightIndex ? Colors.Right : Colors.Wrong) : Colors.Normal}`}
						htmlFor={getOptionName(i)}>{option}</label>
				</div>
			) }
		</form>

	</div>
}