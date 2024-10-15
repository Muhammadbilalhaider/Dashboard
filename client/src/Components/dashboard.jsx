import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        navigate("/login");
      }else
      {
        navigate("/")
      }
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem("authToken") ? <Navbar /> : null}
    </div>
  );
};

export default Dashboard;
