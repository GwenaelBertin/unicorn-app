import React from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Field, Input, Dropdown, Option, Textarea } from '@fluentui/react-components';
import type { Startup, Sector, Status } from '../../types/Startup';

interface CreateStartupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  sectors: Sector[];
  statuses: Status[];
  newStartup: Partial<Startup>;
  onFormChange: (fieldName: keyof Omit<Startup, 'sector' | 'status'>, value: string | number) => void;
  onDropdownChange: (fieldName: 'sector' | 'status', selectedId: string | undefined) => void;
}

const CreateStartupModal: React.FC<CreateStartupModalProps> = ({
  open,
  onClose,
  onCreate,
  sectors,
  statuses,
  newStartup,
  onFormChange,
  onDropdownChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Créer une nouvelle startup</DialogTitle>
          <DialogContent>
            <Field label="Nom de la startup" required>
              <Input value={newStartup.name} onChange={(_e, data) => onFormChange('name', data.value)} />
            </Field>
            <Field label="Valorisation ($)" required>
              <Input type="number" value={newStartup.valuation?.toString()} onChange={(_e, data) => onFormChange('valuation', Number(data.value))} />
            </Field>
            <Field label="Secteur" required>
              <Dropdown
                onOptionSelect={(_e, data) => onDropdownChange('sector', data.optionValue)}
                value={newStartup.sector?.name || ''}
                defaultValue={newStartup.sector?.name}
              >
                {sectors.map(sector => (
                  <Option key={sector.sectorId} value={sector.sectorId.toString()}>
                    {sector.name}
                  </Option>
                ))}
              </Dropdown>
            </Field>
            <Field label="Statut" required>
              <Dropdown
                onOptionSelect={(_e, data) => onDropdownChange('status', data.optionValue)}
                value={newStartup.status?.name || ''}
                defaultValue={newStartup.status?.name}
              >
                {statuses.map(status => (
                  <Option key={status.statusId} value={status.statusId.toString()}>
                    {status.name}
                  </Option>
                ))}
              </Dropdown>
            </Field>
            <Field label="Site Web">
              <Input value={newStartup.website} onChange={(_e, data) => onFormChange('website', data.value)} />
            </Field>
            <Field label="Description">
              <Textarea value={newStartup.description} onChange={(_e, data) => onFormChange('description', data.value)} />
            </Field>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>Annuler</Button>
            <Button appearance="primary" onClick={onCreate}>Créer</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default CreateStartupModal; 