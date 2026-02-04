import { describe, it, expect } from "vitest";
import { WordService } from "./wordService";
import terms from "../data/terms.json";

describe("WordService", () => {
	it("getDailyWord should return a word from the terms list", () => {
		const word = WordService.getDailyWord();
		expect(terms).toContainEqual(word);
	});

	it("getDailyWord should return the same word for the same day", () => {
		const word1 = WordService.getDailyWord();
		const word2 = WordService.getDailyWord();
		expect(word1).toEqual(word2);
	});

	it("getRandomWord should return a word from the terms list", () => {
		const word = WordService.getRandomWord();
		expect(terms).toContainEqual(word);
	});
});
