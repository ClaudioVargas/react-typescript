// UsuarioPage.tsx
// Orquesta las pestañas: mantiene el estado compartido (activeTab, roles, user)
// y delega el contenido de cada pestaña a componentes independientes.
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";
import Tabs from "../../../components/layout/Tabs";
import * as roleService from "../../../services/role.service";
import type { Role } from "../../../services/role.types";
import type { UsuarioTabType } from "../types";
import { tabs as tabItems } from "../../../data/mock";
import PerfilTab from "./PerfilTab";
import UsuarioListTab from "./UsuarioListTab";
import RoleTab from "./RoleTab";
import TestTab from "./TestTab";

const UsuarioPage: React.FC = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState<UsuarioTabType>("usuarioManager");

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await roleService.getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  // Fuente única de verdad para los roles: la actualiza RoleTab tras editar.
  const reloadRoles = async () => {
    const data = await roleService.getRoles();
    setRoles(data);
  };

  return (
    <Section title="Pestañas" description="Cambia el panel de contenido con estado local.">
      <Card title="Contenido dinámico" bodyClassName="space-y-5">
        <Tabs tabs={tabItems} activeId={activeTab} onChange={setActiveTab} />
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          {activeTab === "usuarioManager" && <PerfilTab user={user} roles={roles} />}
          {activeTab === "usuarioList" && <UsuarioListTab />}
          {activeTab === "role" && <RoleTab roles={roles} onRolesChange={reloadRoles} />}
          {activeTab === "test" && <TestTab />}
        </div>
      </Card>
    </Section>
  );
};

export default UsuarioPage;