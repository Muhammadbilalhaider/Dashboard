import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem('authToken');
      setToken(currentToken);
      if (!currentToken && window.location.pathname !== '/forgot-password') {
        navigate('/login');
      }
    };

    checkToken();
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate]);

  return (
    <div>
      {token ? <Navbar /> : null}
    </div>
  );
};

export default Dashboard;
