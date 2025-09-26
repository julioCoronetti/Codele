import terms from "../data/terms.json";

export function getTodayTerm(): (typeof terms)[0] {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % terms.length;
    
    return terms[index];
}