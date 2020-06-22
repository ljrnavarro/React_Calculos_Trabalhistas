function formatNumber(numberToFormat) {
  return numberToFormat.toLocaleString('pt-BR', {minimumFractionDigits: 2});
}

export { formatNumber };
