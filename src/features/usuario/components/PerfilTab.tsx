// PerfilTab.tsx
// Pestaña "Mi Perfil": formulario con estado local (nombre y rol del usuario).
import React, { useState } from "react";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";
import TextInput from "../../../components/layout/TextInput";
import Select from "../../demo/components/Select";
import Button from "../../../components/layout/Button";
import type { Role } from "../../../services/role.types";

interface PerfilTabProps {
  user: any;
  roles: Role[];
}

const PerfilTab: React.FC<PerfilTabProps> = ({ user, roles }) => {
  const [name, setName] = useState<string>(user?.name ?? "");
  const [role, setRole] = useState<string>("");

  return (
    <div className="space-y-4">
      <Section
        title="Formularios"
        description="Inputs, select, textarea, checkboxes y switch con estado local."
      >
        <Card bodyClassName="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextInput
              label="Nombre"
              placeholder="Ej: Laura Sánchez"
              value={name}
              onChange={(event) => setName(event.target.value)}
              hint="Nombre visible para otros usuarios."
            />
            <Select
              label="Rol"
              options={roles.map((role) => ({ value: role.id.toString(), label: role.nombre }))}
              value={role}
              onChange={(event) => setRole(event.target.value)}
              hint="Define los permisos del usuario."
            />
          </div>
          <Button variant="primary" fullWidth>
            Guardar cambios
          </Button>
        </Card>
      </Section>
    </div>
  );
};

export default PerfilTab;