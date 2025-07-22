import { createContext, useContext, useRef, useState } from "react";
import { getProgress, type Progress, updateProgress } from "@/utils/progress";

type ProgressContextType = {
	progress: Progress;
	setProgress: React.Dispatch<React.SetStateAction<Progress>>;
	updateProgress: (win: boolean) => void;
	isGameOver: boolean;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
	resetGame: () => void;
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
	const gameEndedRef = useRef<boolean>(false);

	function handleUpdateProgress(win: boolean) {
        if (!gameEndedRef.current) {
            const updated = updateProgress(win);
            setProgress(updated);
            gameEndedRef.current = true;
        }
    }

	function resetGame() {
        setIsGameOver(false);
        gameEndedRef.current = false; // Reset da flag
    }

	return (
		<ProgressContext.Provider
			value={{
				progress,
				setProgress,
				updateProgress: handleUpdateProgress,
				isGameOver,
				setIsGameOver,
				resetGame,
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
