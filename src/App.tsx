import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Row } from "./components/Row";
import { getTodayTerm } from "./utils/getTodayWord";

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
					className="flex flex-col items-center gap-5"
				>
					<input
						className="border-5 border-gray-700 outline-0 rounded-xl p-2"
						ref={inputRef}
						onChange={handleInputChange}
						maxLength={targetWord.length}
						placeholder="Enter your guess"
						value={currentGuess}
					/>
					<button
						className="bg-blue-500 px-5 py-2 text-white outline-0 shadow-xl shadow-black/30 cursor-pointer rounded-xl transition duration-150 ease-in-out hover:scale-110"
						type="submit"
					>
						Guess
					</button>
				</form>
			)}
			<div className="mt-5">
				{guesses.map((guess, index) => (
					<Row key={index} guess={guess} targetWord={targetWord} />
				))}
			</div>
			{isGameOver && guesses[guesses.length - 1] === targetWord && (
				<p>Congratulations!</p>
			)}
			{isGameOver && guesses[guesses.length - 1] !== targetWord && (
				<p>{`Game over! The word was: ${targetWord}`}</p>
			)}
		</div>
	);
};

export default App;
