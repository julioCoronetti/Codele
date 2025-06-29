import { ChartNoAxesColumn, LightbulbIcon } from "lucide-react";
import { toast } from "sonner";
import { getTodayTerm } from "@/utils/getTodayWord";

type NavigationProps = {
	guesses: string[];
	isGameOver: boolean;
	setShowResult: (value: boolean) => void;
};

export const Navigation = ({
	guesses,
	isGameOver,
	setShowResult,
}: NavigationProps) => {
	const term = getTodayTerm();

	return (
		<nav className="w-full h-15 border-b-1 border-white bg-gray-700 flex items-center justify-between px-5 tracking-widest">
			<p className="text-2xl font-bold text-white">Codele</p>
			<div className="flex h-full">
				<button
					type="button"
					className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out"
					onClick={() => {
						if (isGameOver) {
							setShowResult(true);
						}
					}}
				>
					<ChartNoAxesColumn className="text-white" />
				</button>
				<button
					type="button"
					className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out"
					onClick={() => {
						if (guesses.length < 2 && !isGameOver) {
							toast.warning(
								"You can only view the hint at the start of the game.",
								{
									duration: 10000,
								},
							);
						} else if (guesses.length === 2 && !isGameOver) {
							toast.info(`This word appears in ${term.languages}`, {
								duration: 10000,
							});
						} else if (guesses.length === 4 || isGameOver) {
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
			</div>
		</nav>
	);
};
