// RoleTab.tsx
// Pestaña "Gestión de roles": actualiza nombre y descripción de un rol.
import React, { useState } from "react";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";
import TextInput from "../../../components/layout/TextInput";
import Select from "../../demo/components/Select";
import Button from "../../../components/layout/Button";
import * as roleService from "../../../services/role.service";
import type { Role } from "../../../services/role.types";

interface RoleTabProps {
  roles: Role[];
  onRolesChange: (roles: Role[]) => void;
}

const RoleTab: React.FC<RoleTabProps> = ({ roles, onRolesChange }) => {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleDescripcion, setRoleDescripcion] = useState("");
  const [savingRole, setSavingRole] = useState(false);

  const handleRoleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedRoleId(id);
    const found = roles.find((r) => r.id.toString() === id);
    setRoleName(found?.nombre ?? "");
    setRoleDescripcion(found?.descripcion ?? "");
  };

  const handleSaveRole = async () => {
    if (!selectedRoleId) return;
    setSavingRole(true);
    try {
      await roleService.updateRole({
        id: Number(selectedRoleId),
        nombre: roleName,
        descripcion: roleDescripcion,
      });
      alert("Rol actualizado correctamente");
      const data = await roleService.getRoles();
      onRolesChange(data);
    } catch {
      alert("Error al actualizar el rol");
    } finally {
      setSavingRole(false);
    }
  };

  return (
    <div className="space-y-4">
      <Section
        title="Roles"
        description="Actualiza el nombre y la descripción de un rol del sistema."
      >
        <Card bodyClassName="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              label="Rol a editar"
              options={[
                { value: "", label: "Selecciona un rol" },
                ...roles.map((r) => ({ value: r.id.toString(), label: r.nombre })),
              ]}
              value={selectedRoleId}
              onChange={handleRoleSelect}
              hint="Elige el rol que deseas modificar."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextInput
              label="Nombre"
              placeholder="Ej: ADMIN"
              value={roleName}
              onChange={(event) => setRoleName(event.target.value)}
              hint="Nombre identificador del rol."
            />
            <TextInput
              label="Descripción"
              placeholder="Ej: Administrador total del sistema"
              value={roleDescripcion}
              onChange={(event) => setRoleDescripcion(event.target.value)}
              hint="Describe los permisos del rol."
            />
          </div>
          <Button
            variant="primary"
            fullWidth
            disabled={!selectedRoleId || savingRole}
            onClick={handleSaveRole}
          >
            {savingRole ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Card>
      </Section>
    </div>
  );
};

export default RoleTab;