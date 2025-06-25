import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { Startup, Sector, Status } from '../../types/Startup';
import {
  makeStyles,
  tokens,
  List,
  ListItem,
  Avatar,
  Title1,
  Text,
  Body1,
  Caption1,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Link,
  mergeClasses,
  Input,
  Textarea,
  Field,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import type { AvatarNamedColor, DialogOpenChangeEvent, DialogOpenChangeData } from '@fluentui/react-components';
import { FixedSizeList } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import {
  Delete24Regular,
  Edit24Regular,
  Add24Filled
} from '@fluentui/react-icons';
import StartupDetailsModal from './StartupDetailsModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import CreateStartupModal from './CreateStartupModal';
import EditStartupModal from './EditStartupModal';

// makeStyles (de Fluent UI) pour créer des classes CSS à partir d'un objet de style.
const useStyles = makeStyles({
  root: {
    padding: '16px',
  },
  title: {
    margin: '0 0 12px',
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  interactiveListItem: {
    padding: '0px 10px',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contentCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexGrow: 1,
    cursor: 'pointer',
    height: '100%',
  },
  itemSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  dialogSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }
});

const API_URL = 'http://localhost:3000/startups';

const namedColors: AvatarNamedColor[] = [
  'dark-red', 'cranberry', 'red', 'pumpkin', 'peach', 'marigold', 'gold',
  'brass', 'brown', 'forest', 'seafoam', 'dark-green', 'light-teal', 'teal',
  'steel', 'blue', 'royal-blue', 'cornflower', 'navy', 'lavender', 'purple',
  'grape', 'lilac', 'pink', 'magenta', 'plum', 'beige', 'mink', 'platinum',
  'anchor',
];

// couleur aléatoire pour l'avatar
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * namedColors.length);
  return namedColors[randomIndex];
};

// initiales de la startup
const getInitials = (name: string) => {
  const words = name.split(' ');
  const hasAtLeastTwoWords = words.length > 1;

  if (hasAtLeastTwoWords) {
    const firstInitial = words[0][0];
    const secondInitial = words[1][0];
    const initials = firstInitial + secondInitial;
    return initials.toUpperCase();
  } else {
    const firstTwoLetters = name.substring(0, 2);
    return firstTwoLetters.toUpperCase();
  }
};

// format de la valorisation
const formatValuation = (value: number) => {
  const oneBillion = 1000000000;
  const oneMillion = 1000000;

  if (value >= oneBillion) {
    const valueInBillions = value / oneBillion;
    const formattedValue = valueInBillions.toFixed(2);
    return `$${formattedValue}B`;
  } else {
    const valueInMillions = value / oneMillion;
    const formattedValue = valueInMillions.toFixed(0);
    return `$${formattedValue}M`;
  }
};

type StartupWithColor = Startup & { color: AvatarNamedColor };

//Ici on utilise React.forwardRef pour passer la ref. 
// il faut le faire pour que react-window fonctionne correctement avec le composant List.
 
const StartupListRenderer = React.forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => {
  return (
    <List navigationMode="composite" {...props} ref={ref} />
  );
});

type RowData = {
  startups: StartupWithColor[];
  focusedItemId: number | null;
  setFocusedItemId: (id: number) => void;
  handleRowClick: (startup: StartupWithColor) => void;
  handleDeleteClick: (e: React.MouseEvent, startupId: number) => void;
  handleEditClick: (e: React.MouseEvent, startup: StartupWithColor) => void;
};

const Row = ({ index, style, data }: ListChildComponentProps<RowData>) => {
  const { startups, focusedItemId, setFocusedItemId, handleRowClick, handleDeleteClick, handleEditClick } = data;
  const startup = startups[index];
  const styles = useStyles();
  const isSelected = startup.startupId === focusedItemId;

  return (
    <ListItem
      style={style}
      key={startup.startupId}
      className={mergeClasses(styles.interactiveListItem, isSelected && styles.itemSelected)}
    >
      <div
        role="gridcell"
        className={styles.contentCell}
        onClick={() => handleRowClick(startup)}
        onFocus={() => setFocusedItemId(startup.startupId)}
        tabIndex={0}
      >
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

      <div role="gridcell">
        <Button
          appearance="subtle"
          icon={<Edit24Regular />}
          onClick={(e) => handleEditClick(e, startup)}
          aria-label="Modifier"
        />
      </div>

      <div role="gridcell">
        <Button
          appearance="subtle"
          icon={<Delete24Regular />}
          onClick={(e) => handleDeleteClick(e, startup.startupId)}
          aria-label="Supprimer"
        />
      </div>
    </ListItem>
  );
};

// composant principal qui affiche la liste des startups, et toutes les states
export const StartupList: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<StartupWithColor | null>(null);
  const [focusedItemId, setFocusedItemId] = useState<number | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [startupToDelete, setStartupToDelete] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<StartupWithColor | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStartup, setNewStartup] = useState<Partial<Startup>>({
    name: '',
    valuation: 0,
    description: '',
    website: '',
    foundedYear: new Date().getFullYear(),
  });
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const styles = useStyles();

  // Ouvre la modale avecla startup sélectionnée 
  const handleRowClick = (startup: StartupWithColor) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, startup: StartupWithColor) => {
    e.stopPropagation();
    setEditingStartup(startup);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (_e: React.MouseEvent, startupId: number) => {
    setStartupToDelete(startupId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (startupToDelete === null) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${startupToDelete}`);
      // et on n'oublie pas de mettre à jour la state avec la nouvelle liste sans la startup supprimée
      setStartups(prevStartups => prevStartups.filter(s => s.startupId !== startupToDelete));
    } catch (err) {
      setError('Erreur lors de la suppression de la startup.');
    } finally {
      setIsDeleteConfirmOpen(false);
      setStartupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setStartupToDelete(null);
  };

  const handleSaveEdit = async () => {
    if (!editingStartup) return;

    try {
      const { color, ...startupToUpdate } = editingStartup;
      const response = await axios.put(`${API_URL}/${editingStartup.startupId}`, startupToUpdate);

      setStartups(startups.map(s => s.startupId === editingStartup.startupId ? { ...response.data, color: editingStartup.color } : s));
      setIsEditModalOpen(false);
      setEditingStartup(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour de la startup.");
    }
  };
  
  const handleOpenCreateModal = () => {
    setNewStartup({
      name: '',
      valuation: 0,
      description: '',
      website: '',
      foundedYear: new Date().getFullYear(),
      sector: sectors[0],
      status: statuses[0],
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateFormChange = (fieldName: keyof Omit<Startup, 'sector' | 'status'>, value: string | number) => {
    setNewStartup(current => ({ ...current, [fieldName]: value }));
  };

  // gestion des dropdowns
  const handleCreateDropdownChange = (fieldName: 'sector' | 'status', selectedId: string | undefined) => {
    if (selectedId === undefined) return;
    
    const id = parseInt(selectedId, 10);
    const selectedValue = fieldName === 'sector'
      ? sectors.find(s => s.sectorId === id)
      : statuses.find(s => s.statusId === id);
    
    if (selectedValue) {
      setNewStartup(current => ({ ...current, [fieldName]: selectedValue }));
    }
  };

  const handleSaveNewStartup = async () => {
    try {
      const response = await axios.post(API_URL, newStartup);
      const createdStartup = response.data;
      
      setStartups(currentStartups => [...currentStartups, createdStartup]);
      
      setIsCreateModalOpen(false);
    } catch (err) {
      setError("Erreur lors de la création de la startup.");
    }
  };

  // ici on utilise usememo pour ne pas recalculer les couleurs
  const startupsWithColors = useMemo(() => {
    const coloredStartups = startups.map((startup) => {
      const newStartup = {
        name: startup.name,
        foundedYear: startup.foundedYear,
        valuation: startup.valuation,
        website: startup.website,
        description: startup.description,
        sector: startup.sector,
        status: startup.status,
        startupId: startup.startupId,
        // on ajoute  la couleur aléatoire
        color: getRandomColor(),
      };
      return newStartup;
    });
    return coloredStartups;
  }, [startups]); // on ne recalcule pas les couleurs si startups change

  // et ici on utilise useMemo pour ne recalculer itemData que si startupsWithColors ou focusedItemId changent
  const itemData = useMemo(function() {
    // On crée un objet qui contient toutes les datas nécessaires pour chaque ligne de la liste
    const dataForRows = {
      startups: startupsWithColors,      
      focusedItemId: focusedItemId,      
      setFocusedItemId: setFocusedItemId,
      handleRowClick: handleRowClick,
      handleDeleteClick: handleDeleteClick,
      handleEditClick: handleEditClick
    };

    // On retourne cet objet
    return dataForRows;
  }, [startupsWithColors, focusedItemId, setFocusedItemId, handleRowClick, handleDeleteClick, handleEditClick]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [startupsRes, sectorsRes, statusesRes] = await Promise.all([
          axios.get<Startup[]>(API_URL),
          axios.get<Sector[]>(`${API_URL.replace('/startups', '')}/sectors`),
          axios.get<Status[]>(`${API_URL.replace('/startups', '')}/status`)
        ]);

        setStartups(startupsRes.data);
        setSectors(sectorsRes.data);
        setStatuses(statusesRes.data);
      } catch (err) {
        setError('Erreur lors du chargement des startups.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.root}>
      <Title1 as="h2" className={styles.title}>
        Top licornes françaises
      </Title1>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button appearance="primary" icon={<Add24Filled />} onClick={handleOpenCreateModal}>
          Créer une startup
        </Button>
      </div>

      <FixedSizeList
        height={600}
        itemCount={startupsWithColors.length}
        itemSize={68}
        width="100%"
        itemData={itemData}
        outerElementType={StartupListRenderer}
      >
        {Row}
      </FixedSizeList>

      {/* modale pour afficher les détails d'une startup. */}
      <StartupDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startup={selectedStartup}
        styles={{ dialogContent: styles.dialogContent, dialogSection: styles.dialogSection }}
      />

      {/* modale de confirmation de suppression */}
      <DeleteConfirmModal
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* modale de création */}
      <CreateStartupModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleSaveNewStartup}
        sectors={sectors}
        statuses={statuses}
        newStartup={newStartup}
        onFormChange={handleCreateFormChange}
        onDropdownChange={handleCreateDropdownChange}
      />

      {/* Modale d'édition */}
      <EditStartupModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        editingStartup={editingStartup}
        onFieldChange={(field, value) => setEditingStartup(s => s ? { ...s, [field]: value } : null)}
      />
    </div>
  );
};