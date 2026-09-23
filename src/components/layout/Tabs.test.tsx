import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'actividad', label: 'Actividad' },
];

describe('Tabs (layout)', () => {
  it('renderiza todos los tabs con role="tab"', () => {
    render(<Tabs tabs={tabs} activeId="resumen" onChange={() => {}} />);
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByText('Resumen')).toBeInTheDocument();
    expect(screen.getByText('Actividad')).toBeInTheDocument();
  });

  it('marca aria-selected en el tab activo', () => {
    render(<Tabs tabs={tabs} activeId="actividad" onChange={() => {}} />);
    const [first, second] = screen.getAllByRole('tab');
    expect(first).toHaveAttribute('aria-selected', 'false');
    expect(second).toHaveAttribute('aria-selected', 'true');
  });

  it('llama onChange con el id al hacer clic en un tab', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} activeId="resumen" onChange={onChange} />);
    await user.click(screen.getByText('Actividad'));
    expect(onChange).toHaveBeenCalledWith('actividad');
  });

  it('callback onChange se conecta al propio tab pulsado', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} activeId="actividad" onChange={onChange} />);
    await user.click(screen.getByText('Resumen'));
    expect(onChange).toHaveBeenCalledWith('resumen');
  });
});