
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: Role;
  kecamatan: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Driver {
  id: string;
  name: string;
}

export interface Shipment {
  id: string;
  userId: string;
  userName: string;
  kecamatan: string;
  date: string;
  product1Id: string;
  product1Name: string;
  quantum1: number;
  product2Id: string;
  product2Name: string;
  quantum2: number;
  totalNominal: number;
  remainingBalance: number;
  driverId: string;
  driverName: string;
  status: 'Lunas' | 'Belum Lunas';
  lastProofImage?: string;
}

export interface Payment {
  id: string;
  shipmentId: string;
  userId: string;
  date: string;
  amount: number;
  proofImage: string;
  status: 'Pending' | 'Approved' | 'Denied';
  denialReason?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  date: string;
  read: boolean;
}
