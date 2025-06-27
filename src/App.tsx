import { LightbulbIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Row } from "./components/Row";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { Toaster } from "./components/ui/sonner";
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

	useEffect(() => {
		if (guesses.length === 2) {
			toast.info(`This word appears in ${term.languages}`, {
				duration: 2000,
			});
		}

		if (guesses.length === 4) {
			toast.info(`This word is a ${term.hint}`, {
				duration: 2000,
			});
		}
	}, [guesses.length]);

	const id = useId();

	return (
		<main className="h-screen w-screen flex flex-col bg-gradient-to-tl from-gray-500 to-gray-300">
			<nav className="w-full h-15 border-b-1 border-white bg-gray-700 flex items-center justify-between px-5 tracking-widest">
				<p className="text-2xl font-bold text-white">Codele</p>
				<button
					type="button"
					className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out"
					onClick={() => {
						if (guesses.length < 2) {
							toast.warning(
								"You can only view the hint at the start of the game.",
								{
									duration: 10000,
								},
							);
						} else if (guesses.length === 2) {
							toast.info(`This word appears in ${term.languages}`, {
								duration: 10000,
							});
						} else if (guesses.length === 4) {
							toast.info(`This word appears in ${term.languages}`, {
								duration: 10000,
							});
							toast.info(`This word is a ${term.hint}`, {
								duration: 10000,
							});
						}
					}}
				>
					<LightbulbIcon className="text-white" />
				</button>
			</nav>
			<Toaster
				expand={true}
				position="top-right"
				closeButton
				richColors
				toastOptions={{
					style: {
						marginTop: "3rem",
						fontSize: "1rem",
					},
				}}
			/>
			<h1 className="text-[10rem] tracking-[3rem] text-gray-700/15 absolute z-0 select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold max-lg:text-[8rem] max-lg:tracking-[2rem] max-md:text-[5rem] max-md:tracking-[1.5rem] max-sm:text-[3.5rem]">
				Codele
			</h1>
			<div className="h-full flex flex-col items-center justify-center relative gap-5">
				<div className="flex flex-col z-10">
					{Array.from({ length: maxAttempts }).map((_, index) => (
						<Row
							key={guesses[index] ?? `empty-${index}`}
							guess={guesses[index] || ""}
							targetWord={targetWord}
						/>
					))}
				</div>

				{!isGameOver && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleGuess();
						}}
						className="flex items-center gap-5"
					>
						<input
							className="border-5 border-gray-700 outline-0 rounded-sm px-5 py-3 text-xl font-bold text-white"
							ref={inputRef}
							onChange={handleInputChange}
							maxLength={targetWord.length}
							placeholder="Enter your guess"
							value={currentGuess}
							id={id}
						/>
						<button
							className="bg-gray-700 px-5 py-3 text-xl font-bold text-white outline-0 shadow-xl shadow-black/30 cursor-pointer rounded-sm transition duration-150 ease-in-out hover:scale-110"
							type="submit"
						>
							ENTER
						</button>
					</form>
				)}
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
		</main>
	);
};

export default App;
