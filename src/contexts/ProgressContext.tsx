import { getProgress, updateProgress, type Progress } from "@/utils/progress";
import { createContext, useContext, useState } from "react";

type ProgressContextType = {
	progress: Progress;
	setProgress: React.Dispatch<React.SetStateAction<Progress>>;
	updateProgress: (win: boolean) => void;
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

	function handleUpdateProgress(win: boolean) {
		const updated = updateProgress(win);
		setProgress(updated);
	}

	return (
		<ProgressContext.Provider
			value={{ progress, setProgress, updateProgress: handleUpdateProgress }}
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
