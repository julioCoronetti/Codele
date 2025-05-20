type RowProps = {
	guess: string;
	targetWord: string;
};

export const Row = ({ guess, targetWord }: RowProps) => {
	function getLetterStatus(letter: string, index: number) {
		if (letter === targetWord[index]) {
			return "correct";
		} else if (targetWord.includes(letter)) {
			return "present";
		} else {
			return "absent";
		}
	}

	return (
		<div className="flex justify-center m-[5px]">
			{guess.split("").map((letter, index) => (
				<span
					key={index}
					className={`w-10 h-10 inline-flex justify-center items-center m-0.5 text-white font-bold text-[1.2em]
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
