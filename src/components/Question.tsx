import { IQuestion } from "@/lib/types";
import { ChangeEvent, useState } from "react";


export default function Question({question}: {question: IQuestion}) {
	console.log('huck')
	const [answer, setAnswer] = useState<any>();

	const onPick = (e: ChangeEvent) => {
		const answerElement = e.target as HTMLInputElement;
		setAnswer(answerElement.value);
	}

	return <div>
		<p className="text-2xl my-8">{question.question}</p>
		<form name="test-options" id="test-options">
			{ question.options.map((option, i) =>
				<div className="w-full" key={i}>
					<input className="hidden peer"
						onChange={onPick}
						type="radio" value={option} id={'option-' + i} name="test-options" key={i} />

					<label className="w-10/12 inline-block my-2.5 py-2 text-2xl rounded-2xl border-2 border-shadow shadow cursor-pointer hover:bg-zinc-100 active:bg-zinc-200"
						htmlFor={'option-' + i}>{option}</label>
				</div>
			) }
		</form>

		<p>{answer}</p>
	</div>
}