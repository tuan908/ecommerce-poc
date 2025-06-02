export function formatCurrency(amount: string, decimals = 2) {
	const amountInNumber = Number(amount);

	if (typeof amountInNumber !== "number" || isNaN(amountInNumber)) {
		return "";
	}

	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amountInNumber);
}
