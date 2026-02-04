
import React, { useState } from 'react';
import { useStore } from './store';
import { Role } from './types';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminInputPengiriman from './pages/admin/InputPengiriman';
import AdminPembayaranUser from './pages/admin/PembayaranUser';
import AdminRekapTagihan from './pages/admin/RekapTagihan';
import AdminSeluruhData from './pages/admin/SeluruhData';
import AdminDatabase from './pages/admin/Database';
import UserDashboard from './pages/user/Dashboard';
import UserTagihan from './pages/user/Tagihan';
import UserPengiriman from './pages/user/Pengiriman';

const App: React.FC = () => {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  if (!store.currentUser) {
    return <Login onLogin={store.login} />;
  }

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (store.currentUser.role === Role.ADMIN) {
    switch (currentPage) {
      case 'input': return <AdminInputPengiriman navigate={navigate} store={store} />;
      case 'pembayaran': return <AdminPembayaranUser navigate={navigate} store={store} />;
      case 'rekap': return <AdminRekapTagihan navigate={navigate} store={store} />;
      case 'data': return <AdminSeluruhData navigate={navigate} store={store} />;
      case 'database': return <AdminDatabase navigate={navigate} store={store} />;
      default: return <AdminDashboard navigate={navigate} logout={store.logout} store={store} />;
    }
  } else {
    switch (currentPage) {
      case 'tagihan': return <UserTagihan navigate={navigate} store={store} />;
      case 'pengiriman': return <UserPengiriman navigate={navigate} store={store} />;
      default: return <UserDashboard navigate={navigate} logout={store.logout} store={store} />;
    }
  }
};

export default App;
