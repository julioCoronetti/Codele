import { ChartNoAxesColumn, LightbulbIcon } from "lucide-react";
import { useTerm } from "@/contexts/TermContext";
import type { Progress } from "@/utils/progress";
import { ModeToggle } from "./ModeToggle";
import { ProgressDialog } from "./ProgressDialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

type NavigationProps = {
	guesses: string[];
	isGameOver: boolean;
	openProgress?: boolean;
	setOpenProgress?: (open: boolean) => void;
	progress: Progress;
};

export const Navigation = ({
	guesses,
	isGameOver,
	openProgress,
	setOpenProgress,
	progress,
}: NavigationProps) => {
	const term = useTerm();

	return (
		<nav className="w-full h-15 border-b-1 border-secondary bg-secondary flex items-center justify-between px-5 tracking-widest">
			<p className="text-2xl font-bold text-secondary-text">Codele</p>
			<div className="flex h-full">
				<ModeToggle />
				<Dialog open={openProgress} onOpenChange={setOpenProgress}>
					<DialogTrigger
						className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-hover-secondary transition duration-150 ease-in-out outline-none"
						disabled={!!openProgress}
					>
						<ChartNoAxesColumn className="text-secondary-text" />
					</DialogTrigger>
					<DialogOverlay />
					<ProgressDialog progress={progress} />
				</Dialog>

				<Dialog>
					<DialogTrigger className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-hover-secondary transition duration-150 ease-in-out outline-none">
						<LightbulbIcon className="text-secondary-text" />
					</DialogTrigger>
					<DialogContent className="w-100 flex flex-col text-white bg-gray-700 rounded-sm top-[30%] left-[83%]  text-xl">
						<DialogTitle className="flex items-center text-4xl gap-2 mb-5">
							Hints <span className="text-3xl">💡</span>
						</DialogTitle>

						{guesses.length < 2 && !isGameOver && (
							<DialogDescription className="text-lg text-white">
								You can only view the hint at the start of the game.
							</DialogDescription>
						)}

						{guesses.length === 2 && !isGameOver && (
							<DialogDescription className="text-lg text-white">
								This word appears in {term.languages.join(", ")}
							</DialogDescription>
						)}

						{(guesses.length === 4 || isGameOver) && (
							<>
								<DialogDescription className="text-lg text-white">
									This word appears in {term.languages.join(", ")}
								</DialogDescription>
								<DialogDescription className="text-lg text-white">
									This word is a {term.hint}
								</DialogDescription>
							</>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</nav>
	);
};
