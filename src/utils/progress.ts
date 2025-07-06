export type Progress = {
	games: number;
	wins: number;
	streak: number;
};

const STORAGE_KEY = "codele-progress";

export function getProgress(): Progress {
	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) return { games: 0, wins: 0, streak: 0 };
	return JSON.parse(data);
}

export function saveProgress(progress: Progress) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateProgress(win: boolean) {
	const prev = getProgress();
	const games = prev.games + 1;
	const wins = win ? prev.wins + 1 : prev.wins;
	const streak = win ? prev.streak + 1 : 0;
	const updated = { games, wins, streak };
	saveProgress(updated);
	return updated;
}