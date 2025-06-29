import { ChartNoAxesColumn, LightbulbIcon } from "lucide-react";
import { toast } from "sonner";
import { getTodayTerm } from "@/utils/getTodayWord";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

type NavigationProps = {
	guesses: string[];
	isGameOver: boolean;
	openProgress?: boolean;
	setOpenProgress?: (open: boolean) => void;
};

export const Navigation = ({
	guesses,
	isGameOver,
	openProgress,
	setOpenProgress,
}: NavigationProps) => {
	const term = getTodayTerm();

	return (
		<nav className="w-full h-15 border-b-1 border-white bg-gray-700 flex items-center justify-between px-5 tracking-widest">
			<p className="text-2xl font-bold text-white">Codele</p>
			<div className="flex h-full">
				<Dialog open={openProgress} onOpenChange={setOpenProgress}>
					<DialogTrigger
						className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out"
						disabled={!!openProgress}
					>
						<ChartNoAxesColumn className="text-white" />
					</DialogTrigger>
					<DialogContent className="h-150 w-200 flex flex-col items-center justify-center text-white bg-gray-900 rounded-sm">
						<DialogTitle className="text-4xl text-white">Progress</DialogTitle>
					</DialogContent>
				</Dialog>
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
