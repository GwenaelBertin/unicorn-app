export const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    return name.substring(0, 2).toUpperCase();
  }
};

export const formatValuation = (value: number) => {
  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  if (value >= oneBillion) {
    return `$${(value / oneBillion).toFixed(2)}B`;
  } else {
    return `$${(value / oneMillion).toFixed(0)}M`;
  }
};

import type { AvatarNamedColor} from '@fluentui/react-components';

const namedColors: AvatarNamedColor[] = [
    'dark-red', 'cranberry', 'red', 'pumpkin', 'peach', 'marigold', 'gold',
    'brass', 'brown', 'forest', 'seafoam', 'dark-green', 'light-teal', 'teal',
    'steel', 'blue', 'royal-blue', 'cornflower', 'navy', 'lavender', 'purple',
    'grape', 'lilac', 'pink', 'magenta', 'plum', 'beige', 'mink', 'platinum',
    'anchor',
];

// couleur aléatoire pour l'avatar
export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * namedColors.length);
    return namedColors[randomIndex];
}; 