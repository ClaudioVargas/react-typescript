// TemaFormModal.tsx
// Modal de creación/edición de un tema. Reutilizable: si `tema` es null crea, si no, edita.
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import TextInput from '../../../components/layout/TextInput';
import Button from '../../../components/layout/Button';
import Modal from './ui/Modal';
import Textarea from './ui/Textarea';
import type { CreateTemaRequest, TemaResponse } from '../types';

interface TemaFormModalProps {
  open: boolean;
  tema: TemaResponse | null;
  onClose: () => void;
  onSave: (payload: CreateTemaRequest) => Promise<void>;
}

const TemaFormModal: FC<TemaFormModalProps> = ({ open, tema, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reinicia el formulario cada vez que se abre (crear o editar).
  useEffect(() => {
    if (!open) return;
    setName(tema?.name ?? '');
    setDescripcion(tema?.descripcion ?? '');
    setError(null);
  }, [open, tema]);

  const handleSubmit = async (): Promise<void> => {
    if (name.trim() === '') {
      setError('El nombre del tema es obligatorio.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave({ name: name.trim(), descripcion: descripcion.trim() });
      onClose();
    } catch {
      setError('No se pudo guardar el tema. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      title={tema ? 'Editar tema' : 'Nuevo tema'}
      description={tema ? 'Actualiza los datos del tema.' : 'Completa los datos del nuevo tema.'}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" disabled={saving} onClick={() => void handleSubmit()}>
            {saving ? 'Guardando...' : tema ? 'Guardar cambios' : 'Crear tema'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <TextInput
          label="Nombre"
          placeholder="Ej: Matemáticas"
          value={name}
          onChange={(event) => setName(event.target.value)}
          hint="Nombre visible para los usuarios."
        />
        <Textarea
          label="Descripción"
          placeholder="Describe brevemente el tema..."
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          hint="Detalle adicional del tema."
        />
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
    </Modal>
  );
};

export default TemaFormModal;