// UsuarioListTab.tsx
// Pestaña "Lista de usuarios": actividad reciente de forma estática.
import React from "react";

const UsuarioListTab: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
      <div>
        <p className="text-sm font-medium text-slate-900">
          Nuevo usuario registrado
        </p>
        <p className="text-xs text-slate-500">Hace 12 minutos</p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
      <div>
        <p className="text-sm font-medium text-slate-900">
          Reporte semanal generado
        </p>
        <p className="text-xs text-slate-500">Hace 1 hora</p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
      <div>
        <p className="text-sm font-medium text-slate-900">
          Actualización pendiente
        </p>
        <p className="text-xs text-slate-500">Hace 3 horas</p>
      </div>
    </div>
  </div>
);

export default UsuarioListTab;