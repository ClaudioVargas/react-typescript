import React, { useEffect, useState } from "react";
import Section from "../../../components/layout/Section";
import * as roleService from "../../../services/role.service";
import type { Role } from "../../../services/role.types";
import type { ConfigTabType, TabItem } from "../types";
import UsuarioListTab from "./UsuarioListTab";
import RoleTab from "./RoleTab";
import TestTab from "../components/TestTab";
import Tabs from "../components/Tabs";
import Card from "../components/Card";
import { Boxes } from "lucide-react";

const tabsConfig: TabItem[] = [
  { id: 'usuarioManager', label: 'Usuarios' },
  { id: 'roleManager', label: 'Roles' },
  { id: 'test', label: 'Test', icon: Boxes },
];

const UsuarioPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState<ConfigTabType>("usuarioManager");

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
    <Section title="Configuración" description="Configuración de Usuarios y roles.">
      <Card title="" bodyClassName="space-y-5">
        <Tabs tabs={tabsConfig} activeId={activeTab} onChange={setActiveTab} />
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
          {activeTab === "usuarioManager" && <UsuarioListTab />}
          {activeTab === "roleManager" && <RoleTab roles={roles} onRolesChange={reloadRoles} />}
          {activeTab === "test" && <TestTab />}
        </div>
      </Card>
    </Section>
  );
};

export default UsuarioPage;