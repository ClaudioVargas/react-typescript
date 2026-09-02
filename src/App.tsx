import React from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DatasetProvider } from './context/DatasetContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DashboardCharts from './pages/DashboardCharts';
import Temas from './features/tema/components/Temas';
import PrivateRoute from './router/PrivateRoute';
import UsuarioPage from './features/usuario/components/UsuarioPage';
import DemoPage from './features/demo/components/DemoPage';

const ProtectedLayout: React.FC = () => {

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
          <Link to="/demo">Demo</Link>

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

        <Route path="/demo" element={<DemoPage />} />

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
            <Route path="/perfil" element={<UsuarioPage />} />
            <Route path="/graficos" element={<DashboardCharts />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
