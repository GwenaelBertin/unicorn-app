export interface Sector {
  sectorId: number;
  name: string;
}

export interface Status {
  statusId: number;
  name: string;
}

export interface Startup {
  startupId: number;
  name: string;
  valuation: number;
  sector: Sector;
  status: Status;
  foundedYear?: number;
  website?: string;
  description?: string;
}