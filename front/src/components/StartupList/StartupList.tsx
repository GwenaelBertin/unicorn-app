import React, { useEffect, useState, useMemo, useReducer } from 'react';
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

// Ici on utilise React.forwardRef pour passer la ref. 
// il faut le faire pour que react-window fonctionne correctement avec le composant List.
 
const StartupListRenderer = React.forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => {
  return (
    <List navigationMode="composite" {...props} ref={ref} />
  );
});

// Ici on définit le type des données passées à la fonction Row
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

// l'état initial pour la gestion des modales
type NewStartupType = Partial<Startup> & { sector?: Sector; status?: Status };
const initialModalState: {
  isReadModalOpen: boolean;
  selectedStartup: StartupWithColor | null;
  isEditModalOpen: boolean;
  editingStartup: StartupWithColor | null;
  isCreateModalOpen: boolean;
  newStartup: NewStartupType;
  isDeleteConfirmOpen: boolean;
  startupToDelete: number | null;
} = {
  isReadModalOpen: false,
  selectedStartup: null,
  isEditModalOpen: false,
  editingStartup: null,
  isCreateModalOpen: false,
  newStartup: {
    name: '',
    valuation: 0,
    description: '',
    website: '',
    foundedYear: new Date().getFullYear(),
    sector: undefined,
    status: undefined,
  },
  isDeleteConfirmOpen: false,
  startupToDelete: null,
};

// Reducer pour gérer toutes les actions sur les modales
type ModalState = typeof initialModalState;
type ModalAction =
  | { type: 'OPEN_READ_MODAL'; startup: StartupWithColor }
  | { type: 'CLOSE_READ_MODAL' }
  | { type: 'OPEN_EDIT_MODAL'; startup: StartupWithColor }
  | { type: 'CLOSE_EDIT_MODAL' }
  | { type: 'OPEN_CREATE_MODAL'; sectors: Sector[]; statuses: Status[] }
  | { type: 'CLOSE_CREATE_MODAL' }
  | { type: 'UPDATE_NEW_STARTUP_FIELD'; field: keyof Omit<Startup, 'sector' | 'status'>; value: string | number }
  | { type: 'UPDATE_NEW_STARTUP_DROPDOWN'; field: 'sector' | 'status'; value: Sector | Status }
  | { type: 'OPEN_DELETE_CONFIRM'; startupId: number }
  | { type: 'CLOSE_DELETE_CONFIRM' };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_READ_MODAL':
      return { ...state, isReadModalOpen: true, selectedStartup: action.startup };
    case 'CLOSE_READ_MODAL':
      return { ...state, isReadModalOpen: false, selectedStartup: null };
    case 'OPEN_EDIT_MODAL':
      return { ...state, isEditModalOpen: true, editingStartup: action.startup };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, isEditModalOpen: false, editingStartup: null };
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        isCreateModalOpen: true,
        newStartup: {
          name: '',
          valuation: 0,
          description: '',
          website: '',
          foundedYear: new Date().getFullYear(),
          sector: action.sectors[0] || undefined,
          status: action.statuses[0] || undefined,
        }
      };
    case 'CLOSE_CREATE_MODAL':
      return { ...state, isCreateModalOpen: false };
    case 'UPDATE_NEW_STARTUP_FIELD':
      return {
        ...state,
        newStartup: { ...state.newStartup, [action.field]: action.value }
      };
    case 'UPDATE_NEW_STARTUP_DROPDOWN':
      return {
        ...state,
        newStartup: { ...state.newStartup, [action.field]: action.value }
      };
    case 'OPEN_DELETE_CONFIRM':
      return { ...state, isDeleteConfirmOpen: true, startupToDelete: action.startupId };
    case 'CLOSE_DELETE_CONFIRM':
      return { ...state, isDeleteConfirmOpen: false, startupToDelete: null };
    default:
      return state;
  }
}

// a nouveau reducer pour loading et error
type FetchState = {
  loading: boolean;
  error: string | null;
};

type FetchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR'; error: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null };
    case 'FETCH_ERROR':
      return { loading: false, error: action.error };
    default:
      return state;
  }
}

// composant principal qui affiche la liste des startups, et toutes les states
export const StartupList: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  
  const [focusedItemId, setFocusedItemId] = useState<number | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  // Utilisation du hook useReducer pour gérer toutes les modales
  // cf doc https://fr.react.dev/reference/react/useReducer
  // modalState contient l'état, dispatchModal permet d'envoyer des actions
  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);

  // hook useReducer pour gérer le chargement et l'erreur
  // fetchState contient l'état, dispatchFetch permet d'envoyer des actions
  const [fetchState, dispatchFetch] = useReducer(fetchReducer, { loading: true, error: null });

  const styles = useStyles();

  // Handlers pour ouvrir/fermer les modales via le reducer ---
  // Ouvre la modale de détails (lecture seule)
  const handleRowClick = (startup: StartupWithColor) => {
    dispatchModal({ type: 'OPEN_READ_MODAL', startup });
  };

  // Ouvre la modale d'édition
  const handleEditClick = (e: React.MouseEvent, startup: StartupWithColor) => {
    e.stopPropagation();
    dispatchModal({ type: 'OPEN_EDIT_MODAL', startup });
  };

  // Ouvre la modale de suppression
  const handleDeleteClick = (_e: React.MouseEvent, startupId: number) => {
    dispatchModal({ type: 'OPEN_DELETE_CONFIRM', startupId });
  };

  // Confirme la suppression d'une startup
  const handleConfirmDelete = async () => {
    if (modalState.startupToDelete === null) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${modalState.startupToDelete}`);
      setStartups(prevStartups => prevStartups.filter(s => s.startupId !== modalState.startupToDelete));
    } catch (err) {
      dispatchFetch({ type: 'FETCH_ERROR', error: 'Erreur lors de la suppression de la startup.' });
    } finally {
      dispatchModal({ type: 'CLOSE_DELETE_CONFIRM' });
    }
  };

  // Annule la suppression
  const handleCancelDelete = () => {
    dispatchModal({ type: 'CLOSE_DELETE_CONFIRM' });
  };

  // Ouvre la modale de création
  const handleOpenCreateModal = () => {
    dispatchModal({ type: 'OPEN_CREATE_MODAL', sectors, statuses });
  };

  // Gestion des champs du formulaire de création
  const handleCreateFormChange = (fieldName: keyof Omit<Startup, 'sector' | 'status'>, value: string | number) => {
    dispatchModal({ type: 'UPDATE_NEW_STARTUP_FIELD', field: fieldName, value });
  };

  // Gestion des dropdowns du formulaire de création
  const handleCreateDropdownChange = (fieldName: 'sector' | 'status', selectedId: string | undefined) => {
    if (selectedId === undefined) return;
    const id = parseInt(selectedId, 10);
    const selectedValue = fieldName === 'sector'
      ? sectors.find(s => s.sectorId === id)
      : statuses.find(s => s.statusId === id);
    if (selectedValue) {
      dispatchModal({ type: 'UPDATE_NEW_STARTUP_DROPDOWN', field: fieldName, value: selectedValue });
    }
  };

  // Fonction appelée lors de la création d'une startup
  const handleSaveNewStartup = async () => {
    try {
      if (!modalState.newStartup.sector || !modalState.newStartup.status) {
        dispatchFetch({ type: 'FETCH_ERROR', error: 'Secteur ou statut manquant !' });
        return;
      }
      const requestBody = {
        ...modalState.newStartup,
        sectorId: modalState.newStartup.sector.sectorId,
        statusId: modalState.newStartup.status.statusId
      };
      const response = await axios.post(API_URL, requestBody);
      const createdStartup = response.data;
      setStartups(currentStartups => [...currentStartups, createdStartup]);
      dispatchModal({ type: 'CLOSE_CREATE_MODAL' });
    } catch (err) {
      dispatchFetch({ type: 'FETCH_ERROR', error: 'Erreur lors de la création de la startup.' });
    }
  };

  // Fonction appelée lors de l'édition d'une startup
  const handleSaveEdit = async () => {
    if (!modalState.editingStartup) return;
    try {
      const { color, sector, status, ...startupToUpdate } = modalState.editingStartup;
      if (!sector || !status) {
        dispatchFetch({ type: 'FETCH_ERROR', error: 'Secteur ou statut manquant !' });
        return;
      }
      const requestBody = {
        ...startupToUpdate,
        sectorId: sector.sectorId,
        statusId: status.statusId
      };
      const response = await axios.patch(`${API_URL}/${modalState.editingStartup.startupId}`, requestBody);
      setStartups(startups.map(s =>
        s.startupId === modalState.editingStartup!.startupId
          ? { ...response.data, color: modalState.editingStartup!.color }
          : s
      ));
      dispatchModal({ type: 'CLOSE_EDIT_MODAL' });
    } catch (err) {
      dispatchFetch({ type: 'FETCH_ERROR', error: 'Erreur lors de la mise à jour de la startup.' });
    }
  };

  // ici on utilise useMemo pour ne pas recalculer les couleurs
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
      dispatchFetch({ type: 'FETCH_START' });
      try {
        const [startupsRes, sectorsRes, statusesRes] = await Promise.all([
          axios.get<Startup[]>(API_URL),
          axios.get<Sector[]>(`${API_URL.replace('/startups', '')}/sectors`),
          axios.get<Status[]>(`${API_URL.replace('/startups', '')}/status`)
        ]);

        setStartups(startupsRes.data);
        setSectors(sectorsRes.data);
        setStatuses(statusesRes.data);
        dispatchFetch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatchFetch({ type: 'FETCH_ERROR', error: 'Erreur lors du chargement des startups.' });
      }
    };
    fetchInitialData();
  }, []);
  // c'est ici que l'on affiche le loading et l'erreur
  if (fetchState.loading) return <div>Chargement...</div>;
  if (fetchState.error) return <div>{fetchState.error}</div>;

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
        open={modalState.isReadModalOpen}
        mode="read"
        onClose={() => dispatchModal({ type: 'CLOSE_READ_MODAL' })}
        startup={modalState.selectedStartup}
        styles={{ dialogContent: styles.dialogContent, dialogSection: styles.dialogSection }}
      />

      {/* Modale de confirmation de suppression */}
      <DeleteConfirmModal
        open={modalState.isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Modale de création */}
      <StartupModal
        open={modalState.isCreateModalOpen}
        mode="create"
        onClose={() => dispatchModal({ type: 'CLOSE_CREATE_MODAL' })}
        onSave={handleSaveNewStartup}
        sectors={sectors}
        statuses={statuses}
        startup={modalState.newStartup}
        onFieldChange={handleCreateFormChange}
        onDropdownChange={handleCreateDropdownChange}
      />

      {/* Modale d'édition */}
      <StartupModal
        open={modalState.isEditModalOpen}
        mode="edit"
        onClose={() => dispatchModal({ type: 'CLOSE_EDIT_MODAL' })}
        onSave={handleSaveEdit}
        sectors={sectors}
        statuses={statuses}
        startup={modalState.editingStartup}
        onFieldChange={(field, value) => {
          if (!modalState.editingStartup) return;
          // On met à jour le champ de la startup en cours d'édition
          dispatchModal({ type: 'OPEN_EDIT_MODAL', startup: { ...modalState.editingStartup, [field]: value } });
        }}
        onDropdownChange={(field, selectedId) => {
          if (!modalState.editingStartup) return;
          if (field === 'sector') {
            const id = parseInt(selectedId || '', 10);
            const selectedSector = sectors.find(s => s.sectorId === id);
            if (selectedSector) dispatchModal({ type: 'OPEN_EDIT_MODAL', startup: { ...modalState.editingStartup, sector: selectedSector } });
          } else if (field === 'status') {
            const id = parseInt(selectedId || '', 10);
            const selectedStatus = statuses.find(s => s.statusId === id);
            if (selectedStatus) dispatchModal({ type: 'OPEN_EDIT_MODAL', startup: { ...modalState.editingStartup, status: selectedStatus } });
          }
        }}
      />
    </div>
  );
};