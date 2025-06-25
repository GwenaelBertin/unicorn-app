import React from 'react';
import { ListItem, Avatar, Body1, Caption1, Button, mergeClasses } from '@fluentui/react-components';
import { Edit24Regular, Delete24Regular } from '@fluentui/react-icons';
import type { Startup } from '../../types/Startup';
import type { AvatarNamedColor } from '@fluentui/react-components';

// Type pour une startup avec couleur d'avatar
export type StartupWithColor = Startup & { color: AvatarNamedColor };

// Props du composant StartupListRow
interface StartupListRowProps {
  startup: StartupWithColor;
  isSelected: boolean;
  onRowClick: (startup: StartupWithColor) => void;
  onEditClick: (e: React.MouseEvent, startup: StartupWithColor) => void;
  onDeleteClick: (e: React.MouseEvent, startupId: number) => void;
  setFocusedItemId: (id: number) => void;
  styles: Record<string, string>;
}

// Fonction utilitaire pour obtenir les initiales 
const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    return name.substring(0, 2).toUpperCase();
  }
};

// Fonction utilitaire pour formater la valorisation
const formatValuation = (value: number) => {
  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  if (value >= oneBillion) {
    return `$${(value / oneBillion).toFixed(2)}B`;
  } else {
    return `$${(value / oneMillion).toFixed(0)}M`;
  }
};

/**
 * Composant qui affiche une ligne de la liste des startups.
 * Affiche l'avatar, le nom, la valorisation, et les boutons d'action
 */
const StartupListRow: React.FC<StartupListRowProps> = ({
  startup,
  isSelected,
  onRowClick,
  onEditClick,
  onDeleteClick,
  setFocusedItemId,
  styles,
}) => {
  return (
    <ListItem
      className={mergeClasses(styles.interactiveListItem, isSelected && styles.itemSelected)}
    >
      {/* Cellule principale */}
      <div
        role="gridcell"
        className={styles.contentCell}
        onClick={() => onRowClick(startup)}
        onFocus={() => setFocusedItemId(startup.startupId)}
        tabIndex={0}
      >
        {/* Avatar */}
        <Avatar
          color={startup.color}
          initials={getInitials(startup.name)}
          name={startup.name}
        />
        <div className={styles.itemContent}>
          <Body1>{startup.name}</Body1>
          <Caption1>{`Valuation: ${formatValuation(startup.valuation)}`}</Caption1>
        </div>
      </div>
      {/* Btn edit */}
      <div role="gridcell">
        <Button
          appearance="subtle"
          icon={<Edit24Regular />}
          onClick={e => onEditClick(e, startup)}
          aria-label="Modifier"
        />
      </div>
      {/* Btn delete */}
      <div role="gridcell">
        <Button
          appearance="subtle"
          icon={<Delete24Regular />}
          onClick={e => onDeleteClick(e, startup.startupId)}
          aria-label="Supprimer"
        />
      </div>
    </ListItem>
  );
};

export default StartupListRow; 