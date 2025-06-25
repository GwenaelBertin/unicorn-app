import React from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer cette startup ?
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>Annuler</Button>
            <Button appearance="primary" onClick={onConfirm}>Confirmer</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DeleteConfirmModal;