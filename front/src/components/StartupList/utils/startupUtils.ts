// Fonctions utilitaires pour la gestion des startups

/**
 * Retourne les initiales d'un nom de startup.
 * Si le nom contient plusieurs mots, prend la première lettre des deux premiers mots.
 * Sinon, prend les deux premières lettres du nom.
 */
export const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    return name.substring(0, 2).toUpperCase();
  }
};

/**
 * Formate la valorisation d'une startup en millions ou milliards de dollars.
 * Ex: 1200000000 => $1.20B, 50000000 => $50M
 */
export const formatValuation = (value: number) => {
  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  if (value >= oneBillion) {
    return `$${(value / oneBillion).toFixed(2)}B`;
  } else {
    return `$${(value / oneMillion).toFixed(0)}M`;
  }
}; 