import type { Progress } from "@/utils/progress";
import { DialogContent, DialogTitle } from "./ui/dialog";

type ProgressDialogProps = {
	progress: Progress;
};

export const ProgressDialog = ({ progress }: ProgressDialogProps) => {
	return (
		<DialogContent className="h-150 w-200 flex flex-col items-center p-20 text-white bg-gray-700 rounded-sm">
			<DialogTitle className="text-4xl text-white">Progress</DialogTitle>
			<div className="flex flex-row justify-center items-end gap-20 mt-10">
				<div className="flex flex-col items-center">
					<span className="text-5xl font-bold">{progress.games}</span>
					<span className="text-lg">games</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-5xl font-bold">
						{progress.games > 0
							? Math.round((progress.wins / progress.games) * 100)
							: 0}
						%
					</span>
					<span className="text-lg">win rate</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-5xl font-bold">{progress.streak}</span>
					<span className="text-lg">win streak</span>
				</div>
			</div>
			<div className="w-100 h-50 bg-white mt-10 rounded-sm p-5 flex flex-col justify-between">
				<h3 className="text-[2rem] font-bold text-gray-500">Today's word: </h3>
				<div className="w-full h-[50%]">
					<p className="text-6xl text-gray-500 text-center">
						INPUT<span>🥳</span>
					</p>
				</div>
			</div>
		</DialogContent>
	);
};
