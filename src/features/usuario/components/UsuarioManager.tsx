import React, { useState } from "react";
import { createUsuario, updateUsuario } from "../services/usuario.service";
// import { createProfile, updateProfileType } from "../../features/auth/services/profile.service";

const UsuarioManager: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = async () => {
    await createUsuario({
      nombre, email,
      password: ""
    });
    alert("Perfil creado");
  };

  const handleUpdate = async (id: number) => {
    await updateUsuario({
      id, 
      nombre,
      email
    });
    alert("Perfil actualizado");
  };

  return (
    <div>
      <h3>Gestión de Perfiles</h3>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del perfil" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleCreate}>Crear perfil</button>
      <button onClick={() => handleUpdate(1)}>Editar perfil #1</button>
    </div>
  );
};

export default UsuarioManager;
