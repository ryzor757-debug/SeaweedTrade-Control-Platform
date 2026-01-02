
export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  LOGISTICS = 'LOGISTICS',
  ADMIN = 'ADMIN'
}

export interface HarvestBatch {
  id: string;
  farmerId: string;
  species: string;
  weight: number; // in kg
  harvestDate: string;
  status: 'PENDING' | 'APPROVED' | 'SOLD' | 'SHIPPED';
  price?: number;
  qualityGrade?: string;
}

export interface Order {
  id: string;
  batchId: string;
  buyerId: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  date: string;
}

export interface MarketTrend {
  month: string;
  price: number;
  volume: number;
}
