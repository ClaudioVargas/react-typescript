import React, { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { DatasetProvider } from './context/DatasetContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DashboardCharts from './pages/DashboardCharts';
import Temas from './features/tema/components/Temas';
import PrivateRoute from './router/PrivateRoute';
import UsuarioPage from './features/usuario/components/UsuarioPage';
import DemoPage from './features/demo/components/DemoPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import { navItems, navSecondary } from './data/mock';



const ProtectedLayout: React.FC = () => {
  const navigate = useNavigate();
  // const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');

  const handleSidebarChange = (itemId: string): void => {
    // Lógica aquí
    setActiveNav(itemId);
    // Obtener el item
    const selectedItem = navItems.find(item => item.id === itemId);
    if (selectedItem) {
      // Navegar, cerrar, etc.
      navigate(selectedItem.path);
      setMobileOpen(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-4">
      <Sidebar
        items={navItems}
        secondaryItems={navSecondary}
        activeId={activeNav}
        onChange={handleSidebarChange}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="min-w-0 lg:col-span-3">
        <Header
          title="Panel de componentes"
          subtitle="Maqueta demo: tipografía, formularios, tablas, modales y más"
          onMenuClick={() => setMobileOpen(true)}
        />

        <Outlet />

      </main>

    </div>
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
