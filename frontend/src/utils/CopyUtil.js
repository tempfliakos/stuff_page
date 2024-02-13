export function deepCopy(objects) {
	const result = JSON.stringify(objects);
	return JSON.parse(result);
}