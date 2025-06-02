import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Row } from "./components/Row";
import { getTodayTerm } from "./utils/getTodayWord";
import { Dialog, DialogContent } from "./components/ui/dialog";

const term = getTodayTerm();

const App = () => {
	const targetWord = term.word.toUpperCase();
	const maxAttempts = 6;

	const [guesses, setGuesses] = useState<string[]>([]);
	const [currentGuess, setCurrentGuess] = useState<string>("");
	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentGuess(event.target.value.toUpperCase());
	};

	function handleGuess() {
		if (currentGuess.length !== term.word.length) {
			return;
		}
		const updatedGuesses = [...guesses, currentGuess];
		setGuesses(updatedGuesses);
		setCurrentGuess("");

		if (currentGuess === targetWord || updatedGuesses.length >= maxAttempts) {
			setIsGameOver(true);
		}
	}

	return (
		<div className="h-screen flex flex-col items-center">
			<h1 className="text-4xl my-10 text-gray-700">Codele</h1>

			{!isGameOver && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleGuess();
					}}
					
					className="flex items-center gap-5"
				>
					<input
						className="border-5 border-gray-700 outline-0 rounded-xl px-5 py-3 text-xl font-bold"
						ref={inputRef}
						onChange={handleInputChange}
						maxLength={targetWord.length}
						placeholder="Enter your guess"
						value={currentGuess}
						id="guessInput"
					/>
					<button
						className="bg-gray-700 px-5 py-3 text-xl font-bold text-white outline-0 shadow-xl shadow-black/30 cursor-pointer rounded-xl transition duration-150 ease-in-out hover:scale-110"
						type="submit"
					>
						Guess
					</button>
				</form>
			)}
			<div className="mt-5">
				{guesses.map((guess) => (
					<Row key={guess} guess={guess} targetWord={targetWord} />
				))}
			</div>
			{isGameOver && guesses[guesses.length - 1] === targetWord && (
				<Dialog open={isGameOver} onOpenChange={setIsGameOver}>
					<DialogContent className="h-50 w-90 flex flex-col items-center justify-center text-gray-700 bg-white/90">
						<h1 className="text-4xl text-green-500">Congratulations!</h1>
						<p className="text-2xl">{`The correct word is ${targetWord}!`}</p>
					</DialogContent>
				</Dialog>
			)}
			{isGameOver && guesses[guesses.length - 1] !== targetWord && (
				<Dialog open={isGameOver} onOpenChange={setIsGameOver}>
					<DialogContent className="h-50 w-90 flex flex-col items-center justify-center text-gray-700 bg-white/90">
						<h1 className="text-4xl text-red-500">Game over!</h1>
						<p className="text-2xl">{`The word was: ${targetWord}`}</p>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default App;
