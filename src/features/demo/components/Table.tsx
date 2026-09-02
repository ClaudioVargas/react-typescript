import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
}

export const Table = <T,>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No hay datos para mostrar',
}: TableProps<T>) => (
  <div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-full divide-y divide-slate-200 text-left">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="transition-colors duration-150 hover:bg-slate-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 text-sm text-slate-700 ${column.className ?? ''}`}
                >
                  {column.render
                    ? column.render(row)
                    : String((row as Record<string, unknown>)[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {rows.length === 0 && (
      <p className="px-4 py-8 text-center text-sm text-slate-500">{emptyMessage}</p>
    )}
  </div>
);

export default Table;