type RowProps = {
	guess: string;
	targetWord: string;
};

export const Row = ({ guess, targetWord }: RowProps) => {
	function getLetterStatus(letter: string, index: number) {
		if (letter === targetWord[index]) {
			return "correct";
		}
		if (targetWord.includes(letter)) {
			return "present";
		}
		return "absent";
	}

	const letters = guess.padEnd(targetWord.length).split("");

	return (
		<div className="flex justify-center ">
			{letters.map((letter, index) => {
				const isFilled = letter.trim().length > 0;
				return (
					<span
						key={letter}
						className={`w-15 h-15 inline-flex justify-center items-center mx-0.5 my-1 font-bold text-3xl rounded
                            ${isFilled ? "text-white" : "text-transparent border-3 border-gray-700 bg-transparent rounded-sm shadow-md shadow-black/30 select-none"}
                            ${isFilled && getLetterStatus(letter, index) === "correct" ? "bg-green-500" : ""}
                            ${isFilled && getLetterStatus(letter, index) === "present" ? "bg-yellow-500" : ""}
                            ${isFilled && getLetterStatus(letter, index) === "absent" ? "bg-red-500" : ""}
                        `}
					>
						{isFilled ? letter : "A"}
					</span>
				);
			})}
		</div>
	);
};
