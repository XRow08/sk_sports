export const FormatNumber = {
  formatToBRL(value: number) {
    if (value === undefined || value === null) return "";
    return `R$ ${value.toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
    })}`;
  },

  reverseFormatBRL(value: string) {
    const numericValue = value.replace(/[R$\s,.]/g, "").replace(",", ".");
    return parseFloat(numericValue) || 0
  },

  applyDiscount(value: number, percentage: number) {
    const discount = value * (percentage / 100);
    const finalValue = value - discount;
    return finalValue;
  },
};
