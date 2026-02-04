import { WordService, type Term } from "@/services/wordService";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type GameMode = "daily" | "practice";

type TermContextType = {
	term: Term;
	gameMode: GameMode;
	startPracticeGame: () => void;
	startDailyGame: () => void;
};

const TermContext = createContext<TermContextType | undefined>(undefined);

export const TermProvider = ({ children }: { children: React.ReactNode }) => {
	const [term, setTerm] = useState<Term>(() => WordService.getDailyWord());
	const [gameMode, setGameMode] = useState<GameMode>("daily");

	const startPracticeGame = useCallback(() => {
		setTerm(WordService.getRandomWord());
		setGameMode("practice");
	}, []);

	const startDailyGame = useCallback(() => {
		setTerm(WordService.getDailyWord());
		setGameMode("daily");
	}, []);

	const value = useMemo(
		() => ({
			term,
			gameMode,
			startPracticeGame,
			startDailyGame,
		}),
		[term, gameMode, startPracticeGame, startDailyGame],
	);

	return <TermContext.Provider value={value}>{children}</TermContext.Provider>;
};

export function useTerm() {
	const context = useContext(TermContext);
	if (!context) {
		throw new Error("useTerm must be used within a TermProvider");
	}
	return context;
}
