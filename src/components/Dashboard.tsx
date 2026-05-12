import React from "react";
import { Grid } from "@mui/material";
import { useMetrics } from "../hooks/useMetrics";
import { getTrend } from "../utils/metrics";
import { useDataset } from "../context/DatasetContext";
import MetricCard from "./MatrixCard";

const Dashboard: React.FC = () => {
  const { datasetKey } = useDataset();
  console.log("datasetKey", datasetKey)
  const dataset = useMetrics(datasetKey);
  console.log("dataset", dataset)

  if (!dataset) return <div>Loading...</div>;

  const lastDay = dataset.days.at(-1);

  return (
    <Grid container spacing={2}>
      {dataset.metadata.metrics.map(meta => (
        <Grid item xs={12} sm={6} md={4} key={meta.key}>
          <MetricCard
            meta={meta}
            value={lastDay?.metrics[meta.key] ?? null}
            trend={getTrend(dataset, meta.key)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
