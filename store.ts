
import { useState, useEffect } from 'react';
import { User, Product, Driver, Shipment, Payment, Notification, Role } from './types';
import { INITIAL_USERS, INITIAL_PRODUCTS, INITIAL_DRIVERS } from './constants';

const LOCAL_STORAGE_KEY = 'pembayaran_pupuk_v1';

export const useStore = () => {
  const [data, setData] = useState<{
    users: User[];
    products: Product[];
    drivers: Driver[];
    shipments: Shipment[];
    payments: Payment[];
    notifications: Notification[];
    currentUser: User | null;
  }>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      users: INITIAL_USERS,
      products: INITIAL_PRODUCTS,
      drivers: INITIAL_DRIVERS,
      shipments: [],
      payments: [],
      notifications: [],
      currentUser: null
    };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const login = (username: string, password: string) => {
    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
      setData(prev => ({ ...prev, currentUser: user }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setData(prev => ({ ...prev, currentUser: null }));
  };

  const addShipment = (shipment: Omit<Shipment, 'id' | 'remainingBalance' | 'status'>) => {
    const newShipment: Shipment = {
      ...shipment,
      id: Math.random().toString(36).substr(2, 9),
      remainingBalance: shipment.totalNominal,
      status: 'Belum Lunas'
    };
    setData(prev => ({ ...prev, shipments: [newShipment, ...prev.shipments] }));
  };

  const updateShipment = (id: string, updates: Partial<Shipment>) => {
    setData(prev => ({
      ...prev,
      shipments: prev.shipments.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const deleteShipment = (id: string) => {
    setData(prev => ({
      ...prev,
      shipments: prev.shipments.filter(s => s.id !== id),
      payments: prev.payments.filter(p => p.shipmentId !== id)
    }));
  };

  const submitPayment = (payment: Omit<Payment, 'id' | 'status'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending'
    };
    setData(prev => ({ ...prev, payments: [...prev.payments, newPayment] }));
  };

  const approvePayment = (paymentId: string) => {
    const payment = data.payments.find(p => p.id === paymentId);
    if (!payment) return;

    const shipment = data.shipments.find(s => s.id === payment.shipmentId);
    if (!shipment) return;

    const newRemaining = Math.max(0, shipment.remainingBalance - payment.amount);
    const newStatus = newRemaining === 0 ? 'Lunas' : 'Belum Lunas';

    setData(prev => ({
      ...prev,
      payments: prev.payments.map(p => p.id === paymentId ? { ...p, status: 'Approved' } : p),
      shipments: prev.shipments.map(s => s.id === payment.shipmentId ? { 
        ...s, 
        remainingBalance: newRemaining, 
        status: newStatus as any,
        lastProofImage: payment.proofImage
      } : s)
    }));
  };

  const denyPayment = (paymentId: string, reason: string) => {
    const payment = data.payments.find(p => p.id === paymentId);
    if (!payment) return;

    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId: payment.userId,
      message: `Pembayaran ditolak: ${reason}`,
      date: new Date().toISOString(),
      read: false
    };

    setData(prev => ({
      ...prev,
      payments: prev.payments.map(p => p.id === paymentId ? { ...p, status: 'Denied', denialReason: reason } : p),
      notifications: [newNotification, ...prev.notifications]
    }));
  };

  // CRUD for DB
  const addUser = (user: User) => setData(prev => ({ ...prev, users: [...prev.users, user] }));
  const addProduct = (product: Product) => setData(prev => ({ ...prev, products: [...prev.products, product] }));
  const addDriver = (driver: Driver) => setData(prev => ({ ...prev, drivers: [...prev.drivers, driver] }));
  
  const updateUser = (id: string, user: Partial<User>) => setData(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? {...u, ...user} : u) }));
  const updateProduct = (id: string, product: Partial<Product>) => setData(prev => ({ ...prev, products: prev.products.map(p => p.id === id ? {...p, ...product} : p) }));
  const updateDriver = (id: string, driver: Partial<Driver>) => setData(prev => ({ ...prev, drivers: prev.drivers.map(d => d.id === id ? {...d, ...driver} : d) }));

  const deleteUser = (id: string) => setData(prev => ({ ...prev, users: prev.users.filter(u => u.id !== id) }));
  const deleteProduct = (id: string) => setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  const deleteDriver = (id: string) => setData(prev => ({ ...prev, drivers: prev.drivers.filter(d => d.id !== id) }));

  return {
    ...data,
    login,
    logout,
    addShipment,
    updateShipment,
    deleteShipment,
    submitPayment,
    approvePayment,
    denyPayment,
    addUser,
    addProduct,
    addDriver,
    updateUser,
    updateProduct,
    updateDriver,
    deleteUser,
    deleteProduct,
    deleteDriver
  };
};
