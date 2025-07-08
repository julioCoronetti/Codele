import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Navigation } from "./components/Navigation";
import { Row } from "./components/Row";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { getProgress, type Progress, updateProgress } from "./utils/progress";
import { useTerm } from "./contexts/TermContext";

const App = () => {
	const term = useTerm();
	const targetWord = term.word.toUpperCase();
	const maxAttempts = 6;

	const [guesses, setGuesses] = useState<string[]>([]);
	const [currentGuess, setCurrentGuess] = useState<string>("");
	const [openProgress, setOpenProgress] = useState(false);
	const [progress, setProgress] = useState<Progress>(() => getProgress());

	const inputRef = useRef<HTMLInputElement>(null);

	const isGameOver =
		guesses.includes(targetWord) || guesses.length >= maxAttempts;

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentGuess(event.target.value.toUpperCase());
	};

	function handleGuess() {
		if (isGameOver) {
			return;
		}
		if (currentGuess.length !== term.word.length) {
			return;
		}
		setGuesses([...guesses, currentGuess]);
		setCurrentGuess("");
	}

	useEffect(() => {
		if (guesses.length === 2) {
			toast.info(`This word appears in ${term.languages.join(", ")}`, {
				duration: 2000,
			});
		}

		if (guesses.length === 4) {
			toast.info(`This word is a ${term.hint}`, {
				duration: 2000,
			});
		}
	}, [guesses.length, term]);

	useEffect(() => {
		if (isGameOver && guesses.length > 0) {
			const lastGuess = guesses[guesses.length - 1];
			const win = lastGuess === targetWord;
			if (win) {
				toast.success(`Congratulations! You got it: ${targetWord}`, {
					duration: 1800,
				});
			} else {
				toast.error(`Game over! The word was: ${targetWord}`, {
					duration: 1800,
				});
			}
			const updated = updateProgress(win);
			setProgress(updated);
			setTimeout(() => setOpenProgress(true), 2000);
		}
	}, [isGameOver, guesses, targetWord]);

	const id = useId();

	return (
		<main className="h-screen w-screen flex flex-col bg-app-gradient">
			<Navigation
				guesses={guesses}
				isGameOver={isGameOver}
				openProgress={openProgress}
				setOpenProgress={setOpenProgress}
				progress={progress}
			/>
			<Toaster
				expand={true}
				position="top-center"
				richColors
				toastOptions={{
					style: {
						marginTop: "3rem",
						fontSize: "1rem",
					},
				}}
			/>
			<h1 className="text-[10rem] tracking-[3rem] text-secondary-text-opacity-10 absolute z-0 select-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold max-lg:text-[8rem] max-lg:tracking-[2rem] max-md:text-[5rem] max-md:tracking-[1.5rem] max-sm:text-[3.5rem]">
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
							className="border-5 border-secondary outline-0 rounded-sm px-5 py-3 text-xl font-bold text-secondary"
							ref={inputRef}
							onChange={handleInputChange}
							maxLength={targetWord.length}
							placeholder="Enter your guess"
							value={currentGuess}
							id={id}
						/>
						<Button
							className="btn-custom text-xl font-bold shadow-xl shadow-black/30"
							type="submit"
							variant="lobbyVariant"
							disabled={currentGuess.length !== targetWord.length}
						>
							ENTER
						</Button>
					</form>
				)}
			</div>
		</main>
	);
};

export default App;
