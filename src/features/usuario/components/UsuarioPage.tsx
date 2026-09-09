// UsuarioPage.tsx
// Orquesta las pestañas: mantiene el estado compartido (activeTab, roles, user)
// y delega el contenido de cada pestaña a componentes independientes.
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import * as roleService from "../../../services/role.service";
import type { Role } from "../../../services/role.types";
import PerfilTab from "./PerfilTab";

const UsuarioPage: React.FC = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await roleService.getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);



  return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
           <PerfilTab user={user} roles={roles} />
        </div>
    
  );
};

export default UsuarioPage;