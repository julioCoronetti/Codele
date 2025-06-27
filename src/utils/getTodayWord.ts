import terms from "../data/terms.json";

export function getTodayTerm(): (typeof terms)[0] {
	const index = new Date().getDate() % terms.length;
	return terms[index];
}
