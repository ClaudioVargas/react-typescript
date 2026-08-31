// ProfilePage.tsx
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import UsuarioForm from "./UsuarioForm";
import UserList from "./UserList";
import UsuarioManager from "./UsuarioManager";
// import { useAuth } from "../../hooks/useAuth";
// import ProfileForm from "./ProfileForm";
// import UserList from "./UserList";
// import ProfileManager from "./ProfileManager";

const UsuarioPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "users" | "profiles">("profile");

  const isAdmin = user?.roleId === 1;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h2>Gestión de Perfil</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <button onClick={() => setActiveTab("profile")}>Mi Perfil</button>
        {isAdmin && (
          <>
            <button onClick={() => setActiveTab("users")}>Usuarios</button>
            <button onClick={() => setActiveTab("profiles")}>Perfiles</button>
          </>
        )}
      </div>

      {/* Contenido dinámico */}
      {activeTab === "profile" && <UsuarioForm user={user} />}
      {isAdmin && activeTab === "users" && <UserList />}
      {isAdmin && activeTab === "profiles" && <UsuarioManager />}
    </div>
  );
};

export default UsuarioPage;
