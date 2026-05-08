import React, { createContext, useState, useContext } from "react";

interface DatasetContextType {
  datasetKey: string;
  setDatasetKey: (key: string) => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [datasetKey, setDatasetKey] = useState("A");
  return (
    <DatasetContext.Provider value={{ datasetKey, setDatasetKey }}>
      {children}
    </DatasetContext.Provider>
  );
};

export function useDataset() {
  const ctx = useContext(DatasetContext);
  if (!ctx) throw new Error("useDataset must be used within DatasetProvider");
  return ctx;
}
