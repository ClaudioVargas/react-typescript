interface MetricMeta {
  key: string;
  label: string;
  unit: string;
  direction: "higher_is_better" | "lower_is_better";
  description: string;
}

interface DayMetrics {
  date: string;
  metrics: Record<string, number | null>;
}

interface Dataset {
  metadata: {
    start_date: string;
    end_date: string;
    days: number;
    metrics: MetricMeta[];
  };
  days: DayMetrics[];
}

type MetricsFile = Record<string, Dataset>;
