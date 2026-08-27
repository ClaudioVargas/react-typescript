import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DatasetProvider } from './context/DatasetContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DashboardCharts from './pages/DashboardCharts';
import Temas from './features/tema/components/Temas';
import PrivateRoute from './router/PrivateRoute';

const sampleData = {
  dates: ['Abr', 'May', 'Jun'],
  traffic: [1200, 1800, 1600],
  leads: [30, 45, 40],
  dealsCreated: [10, 18, 15],
  dealsWon: [3, 5, 4],
  dealCycle: [35, 45, 40],
  responseTime: [32, 30, 34],
  tickets: [8, 12, 10],
};

const ProtectedLayout: React.FC = () => {
  console.log("*******************protected router*********************")

  const { user, isAuthenticated, logout } = useAuth();


  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between", // separa izquierda y derecha
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Links a la izquierda */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Inicio</Link>
          <Link to="/temas">Temas</Link>
          <Link to="/graficos">Gráficos</Link>

          {/* Ejemplo condicional por rol */}
          {user?.roleId === 1 && <Link to="/graficos">Gráficos (Admin)</Link>}
        </div>

        {/* Botones a la derecha */}
        {isAuthenticated && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/perfil">Perfil</Link>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#1f2937",
                fontWeight: 600,
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  console.log("*******************public router*********************")
  const { isAuthenticated, isLoading } = useAuth();



  if (isLoading) {
    return <div style={{ padding: 24 }}>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/temas" replace />;
  }

  return children;
};

const DataLayout: React.FC = () => (
  <DatasetProvider>
    <Outlet />
  </DatasetProvider>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <DataLayout />
            </PrivateRoute>
          }
        >
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/temas" element={<Temas />} />
            <Route path="/graficos" element={<DashboardCharts data={sampleData} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
