import { createContext, useContext, useState } from "react";
import { getProgress, type Progress, updateProgress } from "@/utils/progress";

type ProgressContextType = {
	progress: Progress;
	setProgress: React.Dispatch<React.SetStateAction<Progress>>;
	updateProgress: (win: boolean) => void;
	isGameOver: boolean;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
	undefined,
);

export const ProgressProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [progress, setProgress] = useState<Progress>(() => getProgress());
	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	function handleUpdateProgress(win: boolean) {
		const updated = updateProgress(win);
		setProgress(updated);
	}

	return (
		<ProgressContext.Provider
			value={{
				progress,
				setProgress,
				updateProgress: handleUpdateProgress,
				isGameOver,
				setIsGameOver,
			}}
		>
			{children}
		</ProgressContext.Provider>
	);
};

export function useProgress() {
	const context = useContext(ProgressContext);
	if (!context)
		throw new Error("useProgress must be used within a ProgressProvider");
	return context;
}
