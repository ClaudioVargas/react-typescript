import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
// import { MetricMeta } from "../types/metrics";

interface Props {
  meta: MetricMeta;
  value: number | null;
  trend: "up" | "down" | "stable";
}

const MetricCard: React.FC<Props> = ({ meta, value, trend }) => {
  const color = meta.direction === "higher_is_better"
    ? trend === "up" ? "green" : "red"
    : trend === "up" ? "red" : "green";

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{meta.label}</Typography>
        <Typography variant="h4" style={{ color }}>
          {value ?? "—"} {meta.unit}
        </Typography>
        <Typography variant="body2">{meta.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
