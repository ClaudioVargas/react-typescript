import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { DatasetProvider } from './context/DatasetContext';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './router/PrivateRoute';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import { navItems, navSecondary } from './data/mock';

// ── Lazy loading (code splitting) ─────────────────────────────────────────────
// Cada página se importa dinámicamente: Vite genera un chunk por ruta que solo
// se descarga al visitarla por primera vez. React 19 cachea la carga, por lo que
// las siguientes visitas no descargan nada. El shell (Sidebar/Header/contextos)
// permanece en el bundle inicial.
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Home = lazy(() => import('./pages/Home'));
const Temas = lazy(() => import('./features/tema/components/Temas'));
const UsuarioPage = lazy(() => import('./features/usuario/components/UsuarioPage'));
const ConfigPage = lazy(() => import('./features/config/page/ConfigPage'));
const DemoPage = lazy(() => import('./features/demo/components/DemoPage'));

/** Indicador visible mientras se descarga el chunk de la página destino. */
const PageFallback: React.FC = () => (
  <div className="space-y-10 p-6 md:p-8">
    <p className="text-sm text-slate-500">Cargando página…</p>
  </div>
);



const ProtectedLayout: React.FC = () => {
  const navigate = useNavigate();
  // const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');

  const handleSidebarChange = (itemId: string): void => {
    setActiveNav(itemId);
    // Buscar el ítem tanto en la navegación principal como en la secundaria
    const selectedItem = [...navItems, ...navSecondary].find(item => item.id === itemId);
    if (selectedItem) {
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
        <div className="space-y-10 p-6 md:p-8">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </div>
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
            <Suspense fallback={<div style={{ padding: 24 }}>Cargando...</div>}>
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            </Suspense>
          }
        />

        <Route
          path="/demo"
          element={
            <Suspense fallback={<div style={{ padding: 24 }}>Cargando...</div>}>
              <DemoPage />
            </Suspense>
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
            <Route path="/perfil" element={<UsuarioPage />} />
            <Route path="/config" element={<ConfigPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
