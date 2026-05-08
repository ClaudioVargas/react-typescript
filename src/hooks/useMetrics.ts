import { useState, useEffect } from "react";
// import { MetricsFile, Dataset } from "../types/metrics";
import metricsData from "../assets/metrics.json";

export function useMetrics(datasetKey: string): Dataset | null {
  const [data, setData] = useState<Dataset | null>(null);

  useEffect(() => {
    const file: MetricsFile = metricsData as MetricsFile;
    setData(file[datasetKey]);
  }, [datasetKey]);

  return data;
}
