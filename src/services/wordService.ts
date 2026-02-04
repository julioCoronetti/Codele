import terms from "../data/terms.json";

export type Term = (typeof terms)[0];

export const WordService = {
	getDailyWord: (): Term => {
		const today = new Date();
		const startOfYear = new Date(today.getFullYear(), 0, 1);
		const dayOfYear = Math.floor(
			(today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
		);
		const index = dayOfYear % terms.length;
		return terms[index];
	},

	getRandomWord: (): Term => {
		const index = Math.floor(Math.random() * terms.length);
		return terms[index];
	},
};
