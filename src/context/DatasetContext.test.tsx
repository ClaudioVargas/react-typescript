import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatasetProvider, useDataset } from './DatasetContext';

describe('DatasetProvider', () => {
  const renderProvider = () => {
    const Consumer = () => {
      const { datasetKey, setDatasetKey } = useDataset();
      return (
        <>
          <p>dataset:{datasetKey}</p>
          <button onClick={() => setDatasetKey('B')}>cambiar</button>
        </>
      );
    };
    render(<DatasetProvider><Consumer /></DatasetProvider>);
  };

  it('expone "A" como valor por defecto', () => {
    renderProvider();
    expect(screen.getByText('dataset:A')).toBeInTheDocument();
  });

  it('setDatasetKey actualiza el valor del contexto', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'cambiar' }));

    expect(screen.getByText('dataset:B')).toBeInTheDocument();
  });
});