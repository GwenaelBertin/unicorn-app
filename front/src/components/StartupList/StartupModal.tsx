import React, { useRef, useEffect } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Textarea,
  Field,
  Dropdown,
  Option,
  Link,
  Text
} from '@fluentui/react-components';
import type { Startup, Sector, Status } from '../../types/Startup';
import type { AvatarNamedColor } from '@fluentui/react-components';

export type StartupWithColor = Startup & { color?: AvatarNamedColor };

type Mode = 'read' | 'edit' | 'create';

interface StartupModalProps {
  open: boolean; 
  mode: Mode; 
  onClose: () => void; 
  onSave?: () => void; 
  startup?: StartupWithColor | Partial<Startup> | null; // les données de la startup à afficher ou à éditer peut être partielle ou nulle
  onFieldChange?: (field: keyof Omit<Startup, 'sector' | 'status'>, value: string | number) => void; // Callback pour gérer le changement d'un champ texte ou nombre
  onDropdownChange?: (field: 'sector' | 'status', selectedId: string | undefined) => void; // Callback pour gérer le changement d'un dropdown (secteur ou statut)
  sectors?: Sector[]; 
  statuses?: Status[];
  styles?: { dialogContent?: string; dialogSection?: string }; 
};

const StartupModal: React.FC<StartupModalProps> = ({
  open,
  mode,
  onClose,
  onSave,
  startup,
  onFieldChange,
  onDropdownChange,
  sectors = [],
  statuses = [],
  styles = {},
}) => {
  const readOnly = mode === 'read';
  const isEditOrCreate = mode === 'edit' || mode === 'create';
  const isCreate = mode === 'create';

  // Ajout du useRef pour l'input de la valorisation
  const valuationInputRef = useRef<HTMLInputElement>(null);

  // Focus automatique en mode création
  useEffect(() => {
    if (open && mode === 'create' && valuationInputRef.current) {
      valuationInputRef.current.focus();
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {/* Le titre dépend du mode */}
            {mode === 'read' && startup?.name}
            {mode === 'edit' && 'Modifier la startup'}
            {mode === 'create' && 'Créer une nouvelle startup'}
          </DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <div className={styles.dialogSection} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/*
                Pour les fields :
                - Si mode edit/create : on affiche un edit field (input, dropdown, textarea)
                - Si mode 'read' : on affiche juste le texte 
                - Si mode edit/create mais readOnly=true (donc mode=read) on désactive l'input
              */}
              {/* Nom */}
              {isEditOrCreate ? (
                <Field label="Nom de la startup" required>
                  <Input
                    value={startup?.name || ''}
                    onChange={(_e, data) => onFieldChange && onFieldChange('name', data.value)}
                    readOnly={readOnly} // <-- lecture seule si mode='read'
                  />
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Nom</Text>
                  <Text>{startup?.name || 'Non disponible'}</Text>
                </>
              )}
              {/* Valorisation */}
              {isEditOrCreate ? (
                <Field label="Valorisation ($)" required>
                  <Input
                    ref={valuationInputRef}
                    type="number"
                    value={startup?.valuation?.toString() || ''}
                    onChange={(_e, data) => onFieldChange && onFieldChange('valuation', Number(data.value))}
                    readOnly={readOnly} // <-- lecture seule si mode='read'
                  />
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Valorisation ($)</Text>
                  <Text>{startup?.valuation || 'Non disponible'}</Text>
                </>
              )}
              {/* Secteur */}
              {isEditOrCreate ? (
                <Field label="Secteur" required>
                  <Dropdown
                    onOptionSelect={(_e, data) => onDropdownChange && onDropdownChange('sector', data.optionValue)}
                    value={startup?.sector?.name || ''}
                    defaultValue={startup?.sector?.name}
                    disabled={readOnly} 
                  >
                    {sectors.map(sector => (
                      <Option key={sector.sectorId} value={sector.sectorId.toString()}>
                        {sector.name}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Secteur d'activité</Text>
                  <Text>{startup?.sector?.name || 'Non disponible'}</Text>
                </>
              )}
              {/* Statut */}
              {isEditOrCreate ? (
                <Field label="Statut" required>
                  <Dropdown
                    onOptionSelect={(_e, data) => onDropdownChange && onDropdownChange('status', data.optionValue)}
                    value={startup?.status?.name || ''}
                    defaultValue={startup?.status?.name}
                    disabled={readOnly}
                  >
                    {statuses.map(status => (
                      <Option key={status.statusId} value={status.statusId.toString()}>
                        {status.name}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Statut</Text>
                  <Text>{startup?.status?.name || 'Non disponible'}</Text>
                </>
              )}
              {/* Année de création (lecture seule) */}
              {mode === 'read' && (
                <>
                  <Text weight="semibold">Année de création</Text>
                  <Text>{startup?.foundedYear || 'Non disponible'}</Text>
                </>
              )}
              {/* Site Web */}
              {isEditOrCreate ? (
                <Field label="Site Web">
                  <Input
                    value={startup?.website || ''}
                    onChange={(_e, data) => onFieldChange && onFieldChange('website', data.value)}
                    readOnly={readOnly}
                  />
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Site web</Text>
                  {startup?.website ? (
                    <Link href={startup.website} target="_blank" rel="noopener noreferrer">
                      {startup.website}
                    </Link>
                  ) : (
                    <Text>Non disponible</Text>
                  )}
                </>
              )}
              {/* Description */}
              {isEditOrCreate ? (
                <Field label="Description">
                  <Textarea
                    value={startup?.description || ''}
                    onChange={(_e, data) => onFieldChange && onFieldChange('description', data.value)}
                    rows={4}
                    readOnly={readOnly}
                  />
                </Field>
              ) : (
                <>
                  <Text weight="semibold">Description</Text>
                  <Text>{startup?.description || 'Non disponible'}</Text>
                </>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            {/*
              Pour les buttons
              - Si mode 'read' : bouton "Fermer" uniquement
              - Si mode edit/create : bouton "Annuler" + bouton principal ("Sauvegarder" ou "Créer")
            */}
            <Button appearance="secondary" onClick={onClose}>
              {mode === 'read' ? 'Fermer' : 'Annuler'}
            </Button>
            {isEditOrCreate && (
              <Button appearance="primary" onClick={onSave}>
                {isCreate ? 'Créer' : 'Sauvegarder'}
              </Button>
            )}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default StartupModal; 