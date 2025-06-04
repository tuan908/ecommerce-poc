export function formatCurrency(amount: string, decimals = 0) {
	const amountInNumber = Number(amount);

	if (typeof amountInNumber !== "number" || isNaN(amountInNumber)) {
		return "";
	}

	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: 2,
	}).format(amountInNumber);
}
