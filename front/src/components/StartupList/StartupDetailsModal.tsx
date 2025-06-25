import React from 'react';
import { Dialog, DialogSurface, DialogTitle, DialogContent, DialogBody, DialogActions, Button, Link, Text } from '@fluentui/react-components';
import type { Startup } from '../../types/Startup';

// On reprend le type utilisé dans StartupList
import type { AvatarNamedColor } from '@fluentui/react-components';

type StartupWithColor = Startup & { color: AvatarNamedColor };

interface StartupDetailsModalProps {
  open: boolean;
  onClose: () => void;
  startup: StartupWithColor | null;
  styles: { dialogContent: string; dialogSection: string };
}

const StartupDetailsModal: React.FC<StartupDetailsModalProps> = ({ open, onClose, startup, styles }) => {
  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{startup?.name}</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <div className={styles.dialogSection}>
              <Text weight="semibold">Description</Text>
              <Text>{startup?.description || 'Non disponible'}</Text>
            </div>
            <div className={styles.dialogSection}>
              <Text weight="semibold">Secteur d'activité</Text>
              <Text>{startup?.sector?.name || 'Non disponible'}</Text>
            </div>
            <div className={styles.dialogSection}>
              <Text weight="semibold">Année de création</Text>
              <Text>{startup?.foundedYear || 'Non disponible'}</Text>
            </div>
            <div className={styles.dialogSection}>
              <Text weight="semibold">Site web</Text>
              {startup?.website ? (
                <Link href={startup.website} target="_blank" rel="noopener noreferrer">
                  {startup.website}
                </Link>
              ) : (
                <Text>Non disponible</Text>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>Fermer</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default StartupDetailsModal; 