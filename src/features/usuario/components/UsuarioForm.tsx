// ProfileForm.tsx
import React, { useState } from "react";
import { updateUsuario } from "../services/usuario.service";
// import { updateProfile } from "../../features/usuario/services/usuario.service";

const UsuarioForm: React.FC<{ user: any }> = ({ user }) => {

  const [form, setForm] = useState({ id: user.id, nombre: user?.name || "", email: user?.email || "" });
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
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default UsuarioForm;
