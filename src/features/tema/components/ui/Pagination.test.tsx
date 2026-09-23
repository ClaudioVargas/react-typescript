import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination (tema/ui)', () => {
  it('muestra la página actual y el total', () => {
    render(<Pagination page={2} totalPages={5} onChange={() => {}} />);
    const indicator = screen.getByText(
      (_content, node) => node !== null && node.textContent === 'Página 2 de 5',
      { selector: 'p' }
    );
    expect(indicator).toBeInTheDocument();
  });

  it('deshabilita "anterior" en la primera página', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Página siguiente' })).not.toBeDisabled();
  });

  it('deshabilita "siguiente" en la última página', () => {
    render(<Pagination page={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Página siguiente' })).toBeDisabled();
  });

  it('renderiza un botón por página', () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('marca con aria-current la página activa', () => {
    render(<Pagination page={2} totalPages={3} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
  });

  it('al hacer clic en una página llama onChange con su número', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} totalPages={3} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('al hacer clic en "siguiente" llama onChange con page + 1', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={2} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Página siguiente' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('al hacer clic en "anterior" llama onChange con page - 1', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={2} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Página anterior' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});