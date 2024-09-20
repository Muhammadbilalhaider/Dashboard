import React from 'react';

import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-16">
        <Outlet />
      </main>

      <Footer /> 
    </div>
  );
};

export default AppLayout;
