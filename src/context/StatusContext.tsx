import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as statusService from '../services/status.service';
import type { StatusSnapshot } from '../services/status.service';
import { StatusContext, type StatusContextValue } from './StatusContextValue';

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatusState] = useState<StatusSnapshot>(() => statusService.getStatus());
  const [toastOpen, setToastOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Abre (o reabre) el toast y programa su cierre automático.
  const openToast = useCallback((next: StatusSnapshot) => {
    setToastOpen(true);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setToastOpen(false),
      next.type === 'error' ? 6000 : 4000
    );
  }, []);

  // Mantiene el estado de React sincronizado con el store global.
  // Ante errores y mensajes de éxito explícitos muestra un toast automático.
  useEffect(
    () => {
      const unsubscribe = statusService.subscribe((next) => {
        setStatusState(next);
        if (next.type === 'error' || (next.type === 'success' && next.message)) {
          openToast(next);
        }
      });
      return () => {
        unsubscribe();
        if (timerRef.current !== null) clearTimeout(timerRef.current);
      };
    },
    [openToast]
  );

  const setStatus = useCallback((patch: Partial<StatusSnapshot>) => statusService.setStatus(patch), []);
  const clear = useCallback(() => statusService.clear(), []);

  const value = useMemo<StatusContextValue>(
    () => ({ status, isPending: status.type === 'loading', setStatus, clear }),
    [status, setStatus, clear]
  );

  const severity = status.type === 'error' ? 'error' : status.type === 'success' ? 'success' : 'info';

  return (
    <StatusContext.Provider value={value}>
      {children}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {status.message ?? status.operation}
        </Alert>
      </Snackbar>
    </StatusContext.Provider>
  );
};