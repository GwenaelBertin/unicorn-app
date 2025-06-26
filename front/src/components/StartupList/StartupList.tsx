import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { Startup, Sector, Status } from '../../types/Startup';
import {
  makeStyles,
  tokens,
  List,
  Title1,
  Button,
} from '@fluentui/react-components';
import { FixedSizeList } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import { Add24Filled } from '@fluentui/react-icons';
import StartupModal from './StartupModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import StartupListRow from './StartupListRow';
import { getRandomColor } from './utils/startupUtils';
import type { StartupWithColor } from './StartupListRow';

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

// Fonction Row utilisée par react-window pour chaque ligne de la liste
const Row = ({ index, style, data }: ListChildComponentProps<RowData>) => {
  const { startups, focusedItemId, setFocusedItemId, handleRowClick, handleDeleteClick, handleEditClick } = data;
  const startup = startups[index];
  const styles = useStyles();
  const isSelected = startup.startupId === focusedItemId;

  // On utilise le composant StartupListRow pour afficher chaque ligne
  return (
    <div style={style} key={startup.startupId}>
      <StartupListRow
        startup={startup}
        isSelected={isSelected}
        onRowClick={handleRowClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        setFocusedItemId={setFocusedItemId}
        styles={styles}
      />
    </div>
  );
};

// composant principal qui affiche la liste des startups, et toutes les states
export const StartupList: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true); // TODO state staus string pour le chargement pending, error, success
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //TODOutilisation de use reducer pour la modale de details
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

  // Fonction appelée lors de l'édition d'une startup
  const handleSaveEdit = async () => {
    if (!editingStartup) return;

    try {
      // On retire color, sector, status de l'objet à envoyer
      const { color, sector, status, ...startupToUpdate } = editingStartup;
      // Vérification de la présence des relations
      if (!sector || !status) {
        setError("Secteur ou statut manquant !");
        return;
      }
      // On prépare le body avec les ids uniquement
      const requestBody = {
        ...startupToUpdate, // on garde tous les champs sauf color, sector, status
        sectorId: (sector as Sector).sectorId, // on envoie juste l'id
        statusId: (status as Status).statusId  // idem
      };
      // Ajout de logs pour le debug
      console.log('PATCH URL:', `${API_URL}/${editingStartup.startupId}`);
      console.log('PATCH body:', requestBody);
      console.log('startupId:', editingStartup.startupId, 'sectorId:', requestBody.sectorId, 'statusId:', requestBody.statusId);
      // On envoie la requête 
      const response = await axios.patch(`${API_URL}/${editingStartup.startupId}`, requestBody); 
      // map() nous permet de parcourir chaque element du tableau et de remplacer la startup modifiée par la nouvelle réponse de l'API
      setStartups(startups.map(s => 
        s.startupId === editingStartup.startupId 
          ? { ...response.data, color: editingStartup.color } // On remplace la startup modifiée dans la liste, en gardant la couleur
          : s
      ));
      setIsEditModalOpen(false); // On ferme la modale d'édition
      setEditingStartup(null);   // On réinitialise la startup en cours d'édition
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

  // gestion des champs du create form
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

  // Fonction appelée lors de la création 
  const handleSaveNewStartup = async () => {
    try {
      // On prépare le body avec les ids uniquement
      const requestBody = {
        ...newStartup,
        sectorId: (newStartup.sector as Sector).sectorId,
        statusId: (newStartup.status as Status).statusId
      };
      const response = await axios.post(API_URL, requestBody);
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
      const newStartup: StartupWithColor = {
        name: startup.name,
        foundedYear: startup.foundedYear,
        valuation: startup.valuation,
        website: startup.website,
        description: startup.description,
        sector: startup.sector,
        status: startup.status,
        startupId: startup.startupId,
        color: getRandomColor(), // getRandomColor() retourne AvatarNamedColor
      };
      return newStartup;
    });
    return coloredStartups;
  }, [startups]);

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
      <StartupModal
        open={isModalOpen}
        mode="read"
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
      <StartupModal
        open={isCreateModalOpen}
        mode="create"
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewStartup}
        sectors={sectors}
        statuses={statuses}
        startup={newStartup}
        onFieldChange={handleCreateFormChange}
        onDropdownChange={handleCreateDropdownChange}
      />

      {/* Modale d'édition */}
      <StartupModal
        open={isEditModalOpen}
        mode="edit"
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        sectors={sectors}
        statuses={statuses}
        startup={editingStartup}
        onFieldChange={(field, value) => setEditingStartup(s => s ? { ...s, [field]: value } : null)}
        onDropdownChange={(field, selectedId) => {
          if (!editingStartup) return;
          if (field === 'sector') {
            const id = parseInt(selectedId || '', 10);
            const selectedSector = sectors.find(s => s.sectorId === id);
            if (selectedSector) setEditingStartup(s => s ? { ...s, sector: selectedSector } : null);
          } else if (field === 'status') {
            const id = parseInt(selectedId || '', 10);
            const selectedStatus = statuses.find(s => s.statusId === id);
            if (selectedStatus) setEditingStartup(s => s ? { ...s, status: selectedStatus } : null);
          }
        }}
      />
    </div>
  );
};