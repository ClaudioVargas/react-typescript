import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./theme/muiTheme";
import { DatasetProvider, useDataset } from "./context/DatasetContext";
import Home from "./pages/Home";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import DashboardCharts from "./pages/DashboardCharts";
import { useMetrics } from "./hooks/useMetrics";
import LoginPage from './pages/LoginPage';
import PrivateRoute from './router/PrivateRoute';


const sampleData = {
  dates: ["Abr", "May", "Jun"],
  traffic: [1200, 1800, 1600],
  leads: [30, 45, 40],
  dealsCreated: [10, 18, 15],
  dealsWon: [3, 5, 4],
  dealCycle: [35, 45, 40],
  responseTime: [32, 30, 34],
  tickets: [8, 12, 10],
};



const DataLayout = () => (
  <DatasetProvider>
    <Outlet />
  </DatasetProvider>
);


const App: React.FC = () => {
  console.log("***********App**************")

  // const { datasetKey } = useDataset();
  // console.log("datasetKey", datasetKey)
  // const dataset = useMetrics(datasetKey);
  // console.log("dataset", dataset)

  // if (!dataset) return <div>Loading...</div>;
  // console.log("data", dataset)


  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "20px" }}>
        <Link to="/">Inicio</Link>
        <Link to="/graficos">Graficos</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute><DataLayout /></PrivateRoute>}>
          <Route path="/" element={<Home />} />
          <Route
            path="/graficos"
            element={<DashboardCharts data={sampleData} />}
          />
        </Route>
      </Routes>
      {/* <Routes  >
        <Route >
          <Route path="/" element={<Home />} />
          <Route
            path="/graficos" element={ <DashboardCharts /> }/>
        </Route>
      </Routes> */}

    </BrowserRouter>
  );
};

export default App;
