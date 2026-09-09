// isAdmin.ts
// Comprueba si el usuario autenticado tiene rol de administrador.
// Soporta distintos formatos según lo que exponga el backend
// (rol, role, nombreRol, roleId o un arreglo de roles).
const ADMIN_ROLE_IDS = new Set([1]);
const ADMIN_ROLE_NAMES = new Set(['admin', 'administrador', 'administradora']);

const normalize = (value: string): string => value.trim().toLowerCase();

const rolesMatch = (roles: unknown): boolean => {
  if (!Array.isArray(roles)) return false;
  return roles.some((role) => {
    if (typeof role === 'string') return ADMIN_ROLE_NAMES.has(normalize(role));
    if (role && typeof role === 'object') {
      const record = role as Record<string, unknown>;
      const name = record.nombre ?? record.name;
      return typeof name === 'string' && ADMIN_ROLE_NAMES.has(normalize(name));
    }
    return false;
  });
};

export const isAdmin = (user: unknown): boolean => {
  if (!user || typeof user !== 'object') return false;
  const record = user as Record<string, unknown>;

  const roleName = record.rol ?? record.role ?? record.nombreRol;
  if (typeof roleName === 'string' && ADMIN_ROLE_NAMES.has(normalize(roleName))) return true;

  const roleId = record.roleId;
  if (typeof roleId === 'number' && ADMIN_ROLE_IDS.has(roleId)) return true;
  if (typeof roleId === 'string' && ADMIN_ROLE_IDS.has(Number(roleId))) return true;

  return rolesMatch(record.roles);
};

export default isAdmin;