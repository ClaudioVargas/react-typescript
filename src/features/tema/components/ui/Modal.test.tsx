import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal (tema/ui)', () => {
  it('no renderiza nada cuando open es false', () => {
    render(<Modal open={false} title="Título" onClose={() => {}}>contenido</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('muestra título y contenido cuando open es true', () => {
    render(<Modal open title="Confirmar" description="¿Estás seguro?" onClose={() => {}}>
      Contenido del modal
    </Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument();
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument();
  });

  it('cierra con el botón "Cerrar"', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal open title="T" onClose={onClose}>x</Modal>);
    await user.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cierra con la tecla Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal open title="T" onClose={onClose}>x</Modal>);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('no reacciona a Escape cuando está cerrado', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal open={false} title="T" onClose={onClose}>x</Modal>);
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('muestra el footer cuando se pasa', () => {
    render(<Modal open title="T" onClose={() => {}} footer={<button>Guardar</button>}>x</Modal>);
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  });
});