import terms from "../data/terms.json";
import { WordService } from "../services/wordService";

export function getTodayTerm(): (typeof terms)[0] {
	return WordService.getDailyWord();
}
