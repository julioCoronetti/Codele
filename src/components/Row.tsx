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

	return (
		<div className="flex justify-center m-[5px]">
			{guess.split("").map((letter, index) => (
				<span
					key={letter}
					className={`w-13 h-13 inline-flex justify-center items-center mx-0.5 my-1 text-white font-bold text-3xl rounded
                        ${getLetterStatus(letter, index) === "correct" ? "bg-green-500" : ""}
                    
                        ${getLetterStatus(letter, index) === "present" ? "bg-yellow-500" : ""}
                    
                        ${getLetterStatus(letter, index) === "absent" ? "bg-red-500" : ""}`}
				>
					{letter}
				</span>
			))}
		</div>
	);
};
