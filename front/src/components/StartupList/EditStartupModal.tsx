import React from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Input, Textarea, Text } from '@fluentui/react-components';
import type { Startup } from '../../types/Startup';
import type { AvatarNamedColor } from '@fluentui/react-components';

type StartupWithColor = Startup & { color: AvatarNamedColor };

interface EditStartupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editingStartup: StartupWithColor | null;
  onFieldChange: (field: keyof Omit<Startup, 'sector' | 'status'>, value: string | number) => void;
}

const EditStartupModal: React.FC<EditStartupModalProps> = ({
  open,
  onClose,
  onSave,
  editingStartup,
  onFieldChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Modifier la startup</DialogTitle>
          <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <Text weight="semibold">Nom</Text>
                <Input
                  value={editingStartup?.name || ''}
                  onChange={(_e, data) => onFieldChange('name', data.value)}
                />
              </div>
              <div>
                <Text weight="semibold">Valorisation ($)</Text>
                <Input
                  type="number"
                  value={editingStartup?.valuation?.toString() || ''}
                  onChange={(_e, data) => onFieldChange('valuation', Number(data.value))}
                />
              </div>
              <div>
                <Text weight="semibold">Site Web</Text>
                <Input
                  value={editingStartup?.website || ''}
                  onChange={(_e, data) => onFieldChange('website', data.value)}
                />
              </div>
              <div>
                <Text weight="semibold">Description</Text>
                <Textarea
                  value={editingStartup?.description || ''}
                  onChange={(_e, data) => onFieldChange('description', data.value)}
                  rows={4}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>Annuler</Button>
            <Button appearance="primary" onClick={onSave}>Sauvegarder</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default EditStartupModal; 