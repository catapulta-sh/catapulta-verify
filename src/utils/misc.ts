export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isHex(str: string) {
	const regexp = /^0x[0-9a-fA-F]+$/;

	if (regexp.test(str)) {
		return true;
	}

	return false;
}
