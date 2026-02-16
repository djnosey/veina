// Barcelona average costs per unit per month for ~20-unit buildings
// Source: market-overview.md — derived from annual totals for typical 20-unit community

export interface BenchmarkCategory {
  key: string;
  averagePerUnit: number;
  translationKey: string;
}

export const BENCHMARKS: BenchmarkCategory[] = [
  { key: 'fee', averagePerUnit: 105, translationKey: 'calculator.results.categories.fee' },
  { key: 'cleaning', averagePerUnit: 20, translationKey: 'calculator.results.categories.cleaning' },
  { key: 'elevator', averagePerUnit: 10, translationKey: 'calculator.results.categories.elevator' },
  { key: 'insurance', averagePerUnit: 6.25, translationKey: 'calculator.results.categories.insurance' },
  { key: 'admin', averagePerUnit: 7.5, translationKey: 'calculator.results.categories.admin' },
];

// Thresholds for status indicators (ratio of user cost to benchmark)
export const THRESHOLD_GOOD = 0.85;
export const THRESHOLD_FAIR = 1.15;
export const THRESHOLD_HIGH = 1.40;

export type CostStatus = 'good' | 'fair' | 'high' | 'overpaying';

export function getCostStatus(userPerUnit: number, benchmarkPerUnit: number): CostStatus {
  const ratio = userPerUnit / benchmarkPerUnit;
  if (ratio <= THRESHOLD_GOOD) return 'good';
  if (ratio <= THRESHOLD_FAIR) return 'fair';
  if (ratio <= THRESHOLD_HIGH) return 'high';
  return 'overpaying';
}
