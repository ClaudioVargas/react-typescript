import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('muestra las iniciales cuando no hay src', () => {
    render(<Avatar name="Juan Pérez" />);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('muestra como máximo dos iniciales en mayúsculas', () => {
    render(<Avatar name="José María González" />);
    expect(screen.getByText('JM')).toBeInTheDocument();
  });

  it('una sola palabra muestra su inicial', () => {
    render(<Avatar name="admin" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('muestra la imagen cuando hay src usando el nombre como alt', () => {
    render(<Avatar name="Ana" src="https://img.example/foto.png" />);
    expect(screen.getByRole('img', { name: 'Ana' })).toBeInTheDocument();
  });

  it('muestra el indicador de estado cuando se pasa status', () => {
    render(<Avatar name="Ana" status="online" />);
    expect(screen.getByLabelText('online')).toBeInTheDocument();
  });

  it('no muestra indicador de estado si no se pasa status', () => {
    render(<Avatar name="Ana" />);
    expect(screen.queryByLabelText('online')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('offline')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('away')).not.toBeInTheDocument();
  });
});