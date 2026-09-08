// PerfilTab.tsx
// Pestaña "Mi Perfil": formulario con estado local (nombre y rol del usuario).
import React, { useState } from "react";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";
import TextInput from "../../../components/layout/TextInput";
import Select from "../../demo/components/Select";
import Button from "../../../components/layout/Button";
import { updateUsuario } from "../services/usuario.service";
import type { Role } from "../../../services/role.types";

interface PerfilTabProps {
  user: any;
  roles: Role[];
}

const PerfilTab: React.FC<PerfilTabProps> = ({ user, roles }) => {
  const [name, setName] = useState<string>(user?.name ?? "");
  const [role, setRole] = useState<string>(user.roleId?.toString() ?? null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user?.id) {
      alert("No se pudo identificar al usuario");
      return;
    }
    setSaving(true);
    try {
      await updateUsuario({
        id: user.id,
        name: name,
        roleId: role ? parseInt(role) : 0,
        // email: user?.email ?? "",
      });
      alert("Usuario actualizado correctamente");
    } catch {
      alert("Error al actualizar el usuario");
    } finally {
      setSaving(false);
    }
  };

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
          <Button
            variant="primary"
            fullWidth
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Card>
      </Section>
    </div>
  );
};

export default PerfilTab;