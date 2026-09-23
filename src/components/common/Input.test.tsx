import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input (common)', () => {
  it('renderiza el label cuando se pasa', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('funciona sin label', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('propaga value y onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Nombre" value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Ana');
    expect(onChange).toHaveBeenCalled();
  });

  it('propaga atributos HTML como type y required', () => {
    render(<Input label="Email" type="email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
  });
});