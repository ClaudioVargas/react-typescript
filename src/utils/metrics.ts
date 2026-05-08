
export function getTrend(dataset: Dataset, key: string): "up" | "down" | "stable" {
  const last = dataset.days.at(-1)?.metrics[key];
  const prev = dataset.days.at(-2)?.metrics[key];
  if (last == null || prev == null) return "stable";
  return last > prev ? "up" : last < prev ? "down" : "stable";
}

export function calculateWinRate(dataset: Dataset): number | null {
  const won = dataset.days.reduce((acc, d) => acc + (d.metrics.deals_won ?? 0), 0);
  const lost = dataset.days.reduce((acc, d) => acc + (d.metrics.deals_lost ?? 0), 0);
  const total = won + lost;
  return total > 0 ? won / total : null;
}
