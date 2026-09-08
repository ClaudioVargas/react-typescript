// ProfileForm.tsx
import React, { useState } from "react";
import { updateUsuario } from "../services/usuario.service";

const UsuarioForm: React.FC<{ user: any }> = ({ user }) => {

  const [form, setForm] = useState({ id: user.id, name: user?.name || "", roleId: 0 });
  if(user?.id) {
    console.error("No llego usuario")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUsuario(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
      <input name="roleId" value={form.roleId} onChange={handleChange} placeholder="ID del rol" />
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default UsuarioForm;
