import { describe, expect, it } from 'vitest';
import { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import { StatusProvider } from './StatusContext';
import { useStatus } from '../hooks/useStatus';
import * as statusService from '../services/status.service';

describe('StatusProvider', () => {
  let value: ReturnType<typeof useStatus>;

  const renderProvider = () => {
    const Consumer = (): null => {
      value = useStatus();
      return null;
    };
    render(<StatusProvider><Consumer /></StatusProvider>);
  };

  beforeEach(() => {
    statusService.clear();
  });

  it('expone el estado inicial idle', () => {
    renderProvider();
    expect(value!.status.type).toBe('idle');
    expect(value!.isPending).toBe(false);
  });

  it('refleja los cambios del store global (loading/success)', () => {
    renderProvider();

    act(() => statusService.begin('login'));
    expect(value!.status.type).toBe('loading');
    expect(value!.isPending).toBe(true);

    act(() => statusService.succeed('login', 'Hola'));
    expect(value!.status.type).toBe('success');
    expect(value!.status.message).toBe('Hola');
    expect(value!.isPending).toBe(false);
  });

  it('refleja errores con su mensaje por defecto', () => {
    renderProvider();

    act(() => statusService.fail('login', { response: { status: 401 } }));

    expect(value!.status.type).toBe('error');
    expect(value!.status.message).toContain('No autorizado');
  });

  it('setStatus aplica un patch al estado global', () => {
    renderProvider();

    act(() => value!.setStatus({ message: 'manual' }));

    expect(value!.status.message).toBe('manual');
    expect(statusService.getStatus().message).toBe('manual');
  });

  it('clear restablece el estado a idle', () => {
    statusService.begin('op');
    renderProvider();
    expect(value!.isPending).toBe(true);

    act(() => value!.clear());

    expect(value!.status.type).toBe('idle');
    expect(statusService.getStatus().pendingRequests).toBe(0);
  });

  it('un error dispara el toast con el mensaje', async () => {
    renderProvider();

    act(() => statusService.fail('login', { response: { status: 401 } }));

    await waitFor(() =>
      expect(document.body.textContent).toContain('No autorizado. Vuelve a iniciar sesión')
    );
  });
});