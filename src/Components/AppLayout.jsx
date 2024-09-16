import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex pt-6 pb-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AppLayout;
