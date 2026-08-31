// UserList.tsx
import React, { useEffect, useState } from "react";
import { getUsuarios, updateUsuario } from "../services/usuario.service";
// import { getUsers, updateUser } from "../../features/usuario/services/usuario.service";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsuarios();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = async (id: number) => {
    await updateUsuario({
      id: id,
      nombre: "nombre teset",
      email: "email. teset"
    });
    alert("Usuario actualizado");
  };

  return (
    <div>
      <h3>Usuarios</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.email}
            <button onClick={() => handleEdit(u.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
