import { PrismaClient, Status, Sector } from '@prisma/client';
const prisma = new PrismaClient();

interface StatusSeed {
  name: string;
}
interface SectorSeed {
  name: string;
}
interface StartupSeed {
  name: string;
  foundedYear: number;
  valuation: number;
  website: string;
  description: string;
  sectorName: string;
  statusName: string;
}

async function main() {
  const statuses: StatusSeed[] = [
    { name: 'Active' },     // actuellement licorne
    { name: 'IPO' },       // entrée en bourse (donc plus considérée comme licorne)
    { name: 'Acquired' },  // rachetée (plus licorne)
    { name: 'Pre2003' },   // fondée avant 2003 (jamais licorne selon la définition)
    { name: 'Relocated' }, // a déplacé son siège hors de France
  ];
  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  const sectors: SectorSeed[] = [
    { name: 'Santé' },
    { name: 'E-commerce' },
    { name: 'Marketing' },
    { name: 'Banque' },
    { name: 'Multimédia' },
    { name: 'Informatique' },
    { name: 'Fintech' },
    { name: 'Environnement' },
    { name: 'Immobilier' },
    { name: 'Assurance' },
    { name: 'Transport' },
    { name: 'IA' },
    { name: 'Energie' },
    { name: 'Industriel' },
    { name: 'Cryptomonnaie' },
    { name: 'Financement' },
  ];
  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { name: sector.name },
      update: {},
      create: sector,
    });
  }

  const startups: StartupSeed[] = [
    { name: 'Doctolib', foundedYear: 2013, valuation: 6100000000, website: 'https://www.doctolib.fr', description: 'Plateforme de gestion de rendez-vous médicaux', sectorName: 'Santé', statusName: 'Active' },
    { name: 'Back Market', foundedYear: 2014, valuation: 5800000000, website: 'https://www.backmarket.fr', description: 'Marketplace de produits électroniques reconditionnés', sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'Contentsquare', foundedYear: 2012, valuation: 5600000000, website: 'https://www.contentsquare.com', description: 'Analyse de l\'expérience utilisateur', sectorName: 'Marketing', statusName: 'Active' },
    { name: 'Qonto', foundedYear: 2016, valuation: 5000000000, website: 'https://www.qonto.com', description: 'Banque en ligne pour professionnels', sectorName: 'Banque', statusName: 'Active' },
    { name: 'Sorare', foundedYear: 2018, valuation: 4600000000, website: 'https://www.sorare.com', description: 'Jeu de fantasy football basé sur la blockchain', sectorName: 'Multimédia', statusName: 'Active' },
    { name: 'Mirakl', foundedYear: 2012, valuation: 3500000000, website: 'https://www.mirakl.com', description: "Marketplace B2B et B2C", sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'Veepee', foundedYear: 2001, valuation: 3000000000, website: 'https://www.veepee.fr', description: 'Ventes événementielles en ligne', sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'ManoMano', foundedYear: 2013, valuation: 2600000000, website: 'https://www.manomano.fr', description: 'Marketplace de bricolage et jardinage', sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'Mistral AI', foundedYear: 2023, valuation: 2000000000, website: 'https://www.mistral.ai', description: 'Intelligence artificielle générative', sectorName: 'IA', statusName: 'Active' },
    { name: 'Verkor', foundedYear: 2020, valuation: 2000000000, website: 'https://www.verkor.com', description: 'Batteries bas carbone', sectorName: 'Energie', statusName: 'Active' },
    { name: 'Exotec', foundedYear: 2015, valuation: 2000000000, website: 'https://www.exotec.com', description: 'Robots logistiques pour entrepôts', sectorName: 'Industriel', statusName: 'Active' },
    { name: 'PayFit', foundedYear: 2015, valuation: 2000000000, website: 'https://www.payfit.com', description: 'Gestion de paie et RH', sectorName: 'Informatique', statusName: 'Active' },
    { name: 'BlaBlaCar', foundedYear: 2006, valuation: 2000000000, website: 'https://www.blablacar.fr', description: 'Covoiturage longue distance', sectorName: 'Transport', statusName: 'Active' },
    { name: 'Ankorstore', foundedYear: 2019, valuation: 1980000000, website: 'https://www.ankorstore.com', description: 'Marketplace B2B pour commerçants', sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'Voodoo', foundedYear: 2013, valuation: 1700000000, website: 'https://www.voodoo.io', description: 'Jeux mobiles', sectorName: 'Multimédia', statusName: 'Active' },
    { name: 'Vestiaire Collective', foundedYear: 2009, valuation: 1700000000, website: 'https://www.vestiairecollective.com', description: "Marketplace de mode d'occasion", sectorName: 'E-commerce', statusName: 'Active' },
    { name: 'Alan', foundedYear: 2016, valuation: 1680000000, website: 'https://www.alan.com', description: 'Assurance santé digitale', sectorName: 'Santé', statusName: 'Active' },
    { name: 'Ledger', foundedYear: 2014, valuation: 1500000000, website: 'https://www.ledger.com', description: 'Portefeuilles de cryptomonnaies', sectorName: 'Cryptomonnaie', statusName: 'Active' },
    { name: 'NW Groupe', foundedYear: 2009, valuation: 1500000000, website: 'https://www.nw-groupe.com', description: 'Energies renouvelables', sectorName: 'Environnement', statusName: 'Active' },
    { name: 'IAD', foundedYear: 2008, valuation: 1400000000, website: 'https://www.iadfrance.fr', description: 'Réseau immobilier', sectorName: 'Immobilier', statusName: 'Active' },
    { name: 'Dental Monitoring', foundedYear: 2014, valuation: 1200000000, website: 'https://www.dental-monitoring.com', description: 'Suivi dentaire à distance', sectorName: 'Santé', statusName: 'Active' },
    { name: 'Younited', foundedYear: 2009, valuation: 1100000000, website: 'https://www.younited-credit.com', description: 'Crédit en ligne', sectorName: 'Financement', statusName: 'Active' },
    { name: 'Swile', foundedYear: 2018, valuation: 1000000000, website: 'https://www.swile.co', description: 'Titres-restaurant dématérialisés', sectorName: 'Fintech', statusName: 'Active' },
    { name: 'Pennylane', foundedYear: 2020, valuation: 1000000000, website: 'https://www.pennylane.com', description: 'Comptabilité en ligne', sectorName: 'Informatique', statusName: 'Active' },
    { name: 'Pigment', foundedYear: 2019, valuation: 1000000000, website: 'https://www.pigment.com', description: 'Planification financière', sectorName: 'Informatique', statusName: 'Active' },
    { name: 'Spendesk', foundedYear: 2016, valuation: 1000000000, website: 'https://www.spendesk.com', description: 'Gestion des dépenses', sectorName: 'Fintech', statusName: 'Active' },
    { name: 'Shift Technology', foundedYear: 2014, valuation: 1000000000, website: 'https://www.shift-technology.com', description: 'Détection de fraude pour assurances', sectorName: 'Assurance', statusName: 'Active' },
    { name: 'Lydia', foundedYear: 2013, valuation: 1000000000, website: 'https://www.lydia-app.com', description: 'Paiement mobile', sectorName: 'Fintech', statusName: 'Active' },
    { name: 'EcoVadis', foundedYear: 2007, valuation: 1000000000, website: 'https://www.ecovadis.com', description: 'Évaluation RSE des entreprises', sectorName: 'Environnement', statusName: 'Active' },
    { name: 'Ivalua', foundedYear: 2000, valuation: 1000000000, website: 'https://www.ivalua.com', description: 'Gestion des achats', sectorName: 'Informatique', statusName: 'Pre2003' },
    { name: 'OVHcloud', foundedYear: 1999, valuation: 1200000000, website: 'https://www.ovhcloud.com', description: 'Hébergement cloud', sectorName: 'Informatique', statusName: 'Pre2003' },
    { name: 'Kyriba', foundedYear: 2000, valuation: 1000000000, website: 'https://www.kyriba.com', description: 'Gestion de trésorerie', sectorName: 'Informatique', statusName: 'Relocated' },
    { name: 'Dataiku', foundedYear: 2013, valuation: 1100000000, website: 'https://www.dataiku.com', description: "Plateforme d'IA et de data science", sectorName: 'Informatique', statusName: 'Relocated' },
    { name: 'Aircall', foundedYear: 2014, valuation: 1000000000, website: 'https://www.aircall.io', description: 'Téléphonie cloud', sectorName: 'Informatique', statusName: 'Relocated' },
    { name: 'Owkin', foundedYear: 2016, valuation: 1000000000, website: 'https://www.owkin.com', description: 'IA pour la santé', sectorName: 'Santé', statusName: 'Relocated' },
    { name: 'Front', foundedYear: 2013, valuation: 1000000000, website: 'https://www.front.com', description: 'Messagerie collaborative', sectorName: 'Informatique', statusName: 'Relocated' },
    { name: 'Criteo', foundedYear: 2005, valuation: 1500000000, website: 'https://www.criteo.com', description: 'Publicité personnalisée sur internet', sectorName: 'Marketing', statusName: 'IPO' },
    { name: 'Meero', foundedYear: 2016, valuation: 1000000000, website: 'https://www.meero.com', description: 'Plateforme de photographes', sectorName: 'Multimédia', statusName: 'Acquired' },
    { name: 'Talend', foundedYear: 2005, valuation: 1000000000, website: 'https://www.talend.com', description: 'Intégration de données', sectorName: 'Informatique', statusName: 'IPO' },
    { name: 'Deezer', foundedYear: 2007, valuation: 1000000000, website: 'https://www.deezer.com', description: 'Streaming musical', sectorName: 'Multimédia', statusName: 'IPO' },
    { name: 'Believe', foundedYear: 2005, valuation: 1000000000, website: 'https://www.believe.com', description: 'Distribution musicale digitale', sectorName: 'Multimédia', statusName: 'IPO' },
  ];

  for (const s of startups) {
    const sector: Sector | null = await prisma.sector.findUnique({ where: { name: s.sectorName } });
    const status: Status | null = await prisma.status.findUnique({ where: { name: s.statusName } });
    await prisma.startup.upsert({
      where: { name: s.name },
      update: {},
      create: {
        name: s.name,
        foundedYear: s.foundedYear,
        valuation: s.valuation,
        website: s.website,
        description: s.description,
        sectorId: sector?.sectorId!,
        statusId: status?.statusId!,
      },
    });
  }

  console.log('Succès du seed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 