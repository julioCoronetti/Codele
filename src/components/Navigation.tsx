import {
	Calendar,
	ChartNoAxesColumn,
	Gamepad2,
	LightbulbIcon,
} from "lucide-react";
import { memo } from "react";
import { useTerm } from "@/contexts/TermContext";
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
};

export const Navigation = memo(
	({ guesses, isGameOver, openProgress, setOpenProgress }: NavigationProps) => {
		const { term, gameMode, startPracticeGame, startDailyGame } = useTerm();

		return (
			<nav className="w-full h-15 border-b-1 border-secondary bg-secondary flex items-center justify-between px-5 tracking-widest">
				<p className="text-2xl font-bold text-secondary-text">Codele</p>
				<div className="flex h-full">
					{gameMode === "daily" ? (
						<button
							type="button"
							onClick={startPracticeGame}
							className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-hover-secondary transition duration-150 ease-in-out outline-none"
							title="Practice Mode"
						>
							<Gamepad2 className="text-secondary-text" />
						</button>
					) : (
						<button
							type="button"
							onClick={startDailyGame}
							className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-hover-secondary transition duration-150 ease-in-out outline-none"
							title="Daily Mode"
						>
							<Calendar className="text-secondary-text" />
						</button>
					)}
					<ModeToggle />
					<Dialog open={openProgress} onOpenChange={setOpenProgress}>
						<DialogTrigger
							className="w-15 h-full flex justify-center items-center cursor-pointer hover:bg-hover-secondary transition duration-150 ease-in-out outline-none"
							disabled={!!openProgress}
						>
							<ChartNoAxesColumn className="text-secondary-text" />
						</DialogTrigger>
						<DialogOverlay />
						<ProgressDialog />
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
	},
);
