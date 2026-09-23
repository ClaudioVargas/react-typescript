import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

interface Row {
  id: number;
  name: string;
}

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nombre' },
] as const;

const rows: Row[] = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Luis' },
];

describe('Table (tema/ui)', () => {
  it('renderiza cabeceras y todas las filas', () => {
    render(<Table columns={columns} rows={rows} rowKey={(row) => row.id} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Luis')).toBeInTheDocument();
  });

  it('cuenta una fila por registro más la fila de cabecera', () => {
    render(<Table columns={columns} rows={rows} rowKey={(row) => row.id} />);
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('muestra el mensaje vacío cuando no hay filas', () => {
    render(<Table columns={columns} rows={[]} rowKey={(row) => row.id} />);
    expect(screen.getByText('No hay datos para mostrar')).toBeInTheDocument();
  });

  it('usa el emptyMessage personalizado', () => {
    render(<Table columns={columns} rows={[]} rowKey={(row) => row.id} emptyMessage="Sin resultados" />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  it('usa la función render de la columna para valores custom', () => {
    const cols = [{ key: 'name', header: 'Nombre', render: (row: Row) => <strong>{row.name}</strong> }];
    render(<Table columns={cols} rows={rows} rowKey={(row) => row.id} />);
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  it('serializa valores no renderizados vía String()', () => {
    render(<Table columns={columns} rows={rows} rowKey={(row) => row.id} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});