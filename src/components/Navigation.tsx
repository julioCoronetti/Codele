import { ChartNoAxesColumn, LightbulbIcon } from "lucide-react";
import { getTodayTerm } from "@/utils/getTodayWord";
import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

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
					<DialogOverlay />
					<DialogContent className="h-150 w-200 flex flex-col items-center justify-center text-white bg-gray-900 rounded-sm">
						<DialogTitle className="text-4xl text-white">Progress</DialogTitle>
					</DialogContent>
				</Dialog>

				<Dialog>
					<DialogTrigger className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out">
						<LightbulbIcon className="text-white" />
					</DialogTrigger>
					<DialogContent className=" w-100 flex flex-col text-white bg-gray-900 rounded-sm top-[30%] left-[83%]  text-xl">
						<h2 className="flex items-center text-4xl gap-2 mb-5">
							Hints <span className="text-3xl">💡</span>
						</h2>

						{guesses.length < 2 && !isGameOver && (
							<p>You can only view the hint at the start of the game.</p>
						)}

						{guesses.length === 2 && !isGameOver && (
							<li>This word appears in {term.languages.join(", ")}</li>
						)}

						{(guesses.length === 4 || isGameOver) && (
							<>
								<li>This word appears in {term.languages.join(", ")}</li>
								<li>This word is a {term.hint}</li>
							</>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</nav>
	);
};
