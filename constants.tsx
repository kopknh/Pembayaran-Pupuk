
import { Role, User, Product, Driver } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin Utama', username: 'admin', password: '123', role: Role.ADMIN, kecamatan: 'Pusat' },
  { id: '2', name: 'Toko Tani Makmur', username: 'user1', password: '123', role: Role.USER, kecamatan: 'Kecamatan A' },
  { id: '3', name: 'Sinar Abadi', username: 'user2', password: '123', role: Role.USER, kecamatan: 'Kecamatan B' },
  { id: '4', name: 'Berkah Tani', username: 'user3', password: '123', role: Role.USER, kecamatan: 'Kecamatan A' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Pupuk Urea', price: 1500 },
  { id: 'p2', name: 'Pupuk NPK', price: 2500 },
  { id: 'p3', name: 'Pupuk ZA', price: 1200 },
];

export const INITIAL_DRIVERS: Driver[] = [
  { id: 'd1', name: 'Budi Santoso' },
  { id: 'd2', name: 'Andi Wijaya' },
  { id: 'd3', name: 'Rahmat Hidayat' },
];

export const TRUCK_CAPACITY = 10000;
