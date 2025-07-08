import { createContext, useContext } from "react";
import { getTodayTerm } from "@/utils/getTodayWord";

const term = getTodayTerm();

type TermContextType = typeof term;

const TermContext = createContext<TermContextType>(term);

export const TermProvider = ({ children }: { children: React.ReactNode }) => (
	<TermContext.Provider value={term}>{children}</TermContext.Provider>
);

export function useTerm() {
	return useContext(TermContext);
}