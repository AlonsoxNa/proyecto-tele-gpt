import Navbar from '@/Componentes/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      {/* Navbar */ }
      <Navbar />

      {/* Children */ }
      <Outlet />

      {/* Footer??? */ }
    </>
  );
};