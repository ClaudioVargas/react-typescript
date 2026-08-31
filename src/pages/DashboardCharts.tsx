import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useDataset } from "../context/DatasetContext";
import { useMetrics } from "../hooks/useMetrics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartsProps {
  data: {
    dates: string[];
    traffic: number[];
    leadsCreated: number[];
    leadsQualified: number[];
    dealsCreated: number[];
    dealsWon: number[];
    dealsLost: number[];
    avgResponseTimeMin: number[];
    avgDealCycleDays: number[];
    staleDeals: number[];
    supportTicketsOpened: number[];
    supportAvgResolutionHours: number[];
  };
}

const transformDataForCharts = (dataset: Dataset): DashboardChartsProps => {
  // Definimos la estructura inicial para el acumulador
  const initialData: DashboardChartsProps["data"] = {
    dates: [],                                
    traffic: [],                   //"tráfico"                    
    leadsCreated: [],              //"clientes potenciales creados"                               
    leadsQualified: [],            //"clientes potenciales cualificados"                                 
    dealsCreated: [],              //"ofertas creadas"                               
    dealsWon: [],                  //"ofertas ganadas"                       
    dealsLost: [],                 //"ofertas perdidas"                         
    avgResponseTimeMin: [],        //"tiempo medio de respuesta (minutos)"                                   
    avgDealCycleDays: [],          //"ciclo medio de ofertas (días)"                                       
    staleDeals: [],                //"ofertas obsoletas"                           
    supportTicketsOpened: [],      //"tickets de soporte abiertos"                                             
    supportAvgResolutionHours: []  //"tiempo medio de resolución de soporte (horas)"                               
  };

  const transformed = dataset.days.reduce((acc, day) => {
    // Agregamos la fecha
    acc.dates.push(day.date);

    // Mapeo seguro de métricas. 
    // Usamos el operador "as keyof" si queremos iterar, 
    // o acceso directo con fallback (?? 0) para asegurar el tipo 'number'.
    acc.traffic.push(day.metrics["traffic"] ?? 0);
    acc.leadsCreated.push(day.metrics["leads_created"] ?? 0);
    acc.leadsQualified.push(day.metrics["leads_qualified"] ?? 0);
    acc.dealsCreated.push(day.metrics["deals_created"] ?? 0);
    acc.dealsWon.push(day.metrics["deals_won"] ?? 0);
    acc.dealsLost.push(day.metrics["deals_lost"] ?? 0);
    acc.avgResponseTimeMin.push(day.metrics["avg_response_time_min"] ?? 0);
    acc.avgDealCycleDays.push(day.metrics["avg_deal_cycle_days"] ?? 0);
    acc.staleDeals.push(day.metrics["stale_deals"] ?? 0);
    acc.supportTicketsOpened.push(day.metrics["support_tickets_opened"] ?? 0);
    acc.supportAvgResolutionHours.push(day.metrics["support_avg_resolution_hours"] ?? 0);



    return acc;
  }, initialData);

  return { data: transformed };
};


const DashboardCharts: React.FC = () => {
  // const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {

  const { datasetKey } = useDataset();
  const dataset = useMetrics(datasetKey);


  if (!dataset) return <div>Loading...</div>;
  let test = transformDataForCharts(dataset)


  const { dates,
    traffic,
    leadsCreated,
    dealsCreated,
    dealsWon,
    avgResponseTimeMin,
    avgDealCycleDays,
    supportTicketsOpened,
    supportAvgResolutionHours } = test.data;



  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      {/* Tráfico y Leads */}
      <div>
        <h3>Tráfico y Leads Creados</h3>
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "Visitas Diarias",
                data: traffic,
                borderColor: "rgba(54, 162, 235, 0.8)",
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                yAxisID: "y1"
              },
              {
                label: "Leads Creados",
                data: leadsCreated,
                borderColor: "rgba(255, 159, 64, 0.8)",
                backgroundColor: "rgba(255, 159, 64, 0.3)",
                yAxisID: "y2",
              },
            ],
          }}
          options={{
            responsive: true,
            interaction: { mode: "index", intersect: false },
            scales: {
              y1: { type: "linear", position: "left", title: { display: true, text: "Visitas" } },
              y2: { type: "linear", position: "right", title: { display: true, text: "Leads" }, grid: { drawOnChartArea: false } },
            },
          }}
        />
      </div>

      {/* Oportunidades y Deals Ganados */}
      <div>
        <h3>Deals Creados y Deals Ganados</h3>
        <Bar
          data={{
            labels: dates,
            datasets: [
              {
                label: "Oportunidades Creadas",
                data: dealsCreated,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
              {
                label: "Deals Ganados",
                data: dealsWon,
                // type: "line",
                borderColor: "rgba(255, 99, 132, 0.8)",
                borderWidth: 2,
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { position: "top" } } }}
        />
      </div>

      {/* Tiempo de respuesta */}
      <div>
        <h3>Tiempo de respuesta y dias entre apertura y cierre</h3>
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "Tiempo de respuesta",
                data: avgResponseTimeMin,
                borderColor: "blue",
                backgroundColor: "blue",
                // yAxisID: "y1" 
              },
              {
                label: "Dias entre apertura y cierre",
                data: avgDealCycleDays,
                borderColor: "green",
                backgroundColor: "green",
                // yAxisID: "y2" 
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>

      {/* Tiempo de Respuesta y Tickets */}
      <div>
        <h3>Tiempo de Respuesta y Tickets</h3>
        <Bar
          data={{
            labels: dates,
            datasets: [
              {
                label: "Tickets Abiertos",
                data: supportTicketsOpened,
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                yAxisID: "y2",
              },
              {
                label: "Tiempo de Respuesta (min)",
                data: supportAvgResolutionHours,
                // type: "line",
                borderColor: "rgba(54, 162, 235, 0.8)",
                yAxisID: "y1",
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y1: { type: "linear", position: "left", title: { display: true, text: "Minutos" } },
              y2: { type: "linear", position: "right", title: { display: true, text: "Tickets" }, grid: { drawOnChartArea: false } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
