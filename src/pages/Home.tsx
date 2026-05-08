import React from "react";
import Dashboard from "../components/Dashboard";
import DatasetSelector from "../components/DataSetSelector";

const Home: React.FC = () => (
  <div style={{ padding: "2rem" }}>
    <DatasetSelector />
    <Dashboard />
  </div>
);

export default Home;
