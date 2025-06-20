import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { Startup } from '../types/Startup';
import {
  makeStyles,
  shorthands,
  tokens,
  List,
  ListItem,
  Avatar,
  Title1,
  Spinner,
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
} from '@fluentui/react-components';
import type { AvatarNamedColor, DialogOpenChangeEvent, DialogOpenChangeData } from '@fluentui/react-components';
import { FixedSizeList } from 'react-window';
import type { ListChildComponentProps } from 'react-window';

const useStyles = makeStyles({
  root: {
    ...shorthands.padding('16px'),
  },
  title: {
    ...shorthands.margin(0, 0, '12px'),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('16px'),
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  interactiveListItem: {
    cursor: 'pointer',
    ...shorthands.padding('0px', '10px'),
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  itemSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  dialogSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('4px'),
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

const getRandomColor = () => {
  const numberOfColors = namedColors.length;
  const randomDecimal = Math.random();
  const randomFloatingIndex = randomDecimal * numberOfColors;
  const randomIndex = Math.floor(randomFloatingIndex);
  const randomColor = namedColors[randomIndex];
  
  return randomColor;
};

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
};

const Row = ({ index, style, data }: ListChildComponentProps<RowData>) => {
  const { startups, focusedItemId, setFocusedItemId, handleRowClick } = data;
  const startup = startups[index];
  const styles = useStyles();
  const isSelected = startup.startupId === focusedItemId;

  return (
    <ListItem
      style={style}
      key={startup.startupId}
      className={mergeClasses(styles.interactiveListItem, isSelected && styles.itemSelected)}
      onClick={() => handleRowClick(startup)}
      onFocus={() => setFocusedItemId(startup.startupId)}
    >
      <div className={styles.row}>
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
    </ListItem>
  );
};

export const StartupList: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<StartupWithColor | null>(null);
  const [focusedItemId, setFocusedItemId] = useState<number | null>(null);

  const styles = useStyles();

  const handleRowClick = (startup: StartupWithColor) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const startupsWithColors = useMemo((): StartupWithColor[] => {
    return startups.map(s => ({
      ...s,
      color: getRandomColor(),
    }));
  }, [startups]);

  const itemData = useMemo((): RowData => ({
    startups: startupsWithColors,
    focusedItemId,
    setFocusedItemId,
    handleRowClick,
  }), [startupsWithColors, focusedItemId]);


  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get<Startup[]>(API_URL);
        setStartups(res.data);
      } catch (err) {
        setError('pb chargement des startups');
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.root}>
      <Title1 as="h2" className={styles.title}>
        Top licornes françaises
      </Title1>
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

      <Dialog open={isModalOpen} onOpenChange={(_event: DialogOpenChangeEvent, data: DialogOpenChangeData) => setIsModalOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{selectedStartup?.name}</DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div className={styles.dialogSection}>
                <Text weight="semibold">Description</Text>
                <Text>{selectedStartup?.description || 'Non disponible'}</Text>
              </div>

              <div className={styles.dialogSection}>
                <Text weight="semibold">Secteur d'activité</Text>
                <Text>{selectedStartup?.sector?.name || 'Non disponible'}</Text>
              </div>

              <div className={styles.dialogSection}>
                <Text weight="semibold">Année de création</Text>
                <Text>{selectedStartup?.foundedYear || 'Non disponible'}</Text>
              </div>

              <div className={styles.dialogSection}>
                <Text weight="semibold">Site web</Text>
                {selectedStartup?.website ? (
                  <Link href={selectedStartup.website} target="_blank" rel="noopener noreferrer">
                    {selectedStartup.website}
                  </Link>
                ) : (
                  <Text>Non disponible</Text>
                )}
              </div>
            </DialogContent>
            <DialogActions>
                <Button appearance="secondary" onClick={() => setIsModalOpen(false)}>Fermer</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};