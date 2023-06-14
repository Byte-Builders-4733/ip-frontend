export interface IQuestion {
	id: number
	question: string,
	correct_answer: string,
	uncorrect_answer1: string,
	uncorrect_answer2: string,
}

export interface IUser {
	email: string,
	username: string,
	id: number,
	tests_count: 0
}