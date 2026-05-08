import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useDataset } from "../context/DatasetContext";

const DatasetSelector: React.FC = () => {
  const { datasetKey, setDatasetKey } = useDataset();
  const datasets = ["A", "B", "C", "D"];

  return (
    <Select value={datasetKey} onChange={e => setDatasetKey(e.target.value)}>
      {datasets.map(ds => (
        <MenuItem key={ds} value={ds}>{ds}</MenuItem>
      ))}
    </Select>
  );
};

export default DatasetSelector;
