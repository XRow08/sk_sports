export const FormatNumber = {
  formatToBRL(value: number) {
    if (value === undefined || value === null) return "";
    return `R$ ${value.toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  formatToPercentage(value: number) {
    if (value === undefined || value === null) return "";
    if (value === 0) return "0%";
    if (value >= 100) return "100%";
    value = value / 100;
    return `${value.toLocaleString("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  reverseFormatBRL(value: string) {
    const numericValue = value.replace(/[R$\s,.]/g, "").replace(",", ".");
    return parseFloat(numericValue) || 0;
  },

  applyDiscount(value: number, percentage: number) {
    const discount = value * (percentage / 100);
    const finalValue = value - discount;
    return finalValue;
  },
};
