export const tryRefresh = () => {
	try { window.location.reload() }
	catch { }
}

export const shuffleArray = (array: Array<unknown>) => {
	// https://stackoverflow.com/a/12646864/14895348
	const res = [...array];
	for (let i = res.length - 1; i > 0; --i) {
		const j = Math.floor(Math.random() * (i + 1));
		[res[i], res[j]] = [res[j], res[i]];
	}
	return res;
}