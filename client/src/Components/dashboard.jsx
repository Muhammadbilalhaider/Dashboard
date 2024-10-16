import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);

      navigate("/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      const currentPath = window.location.pathname;
      if (
        !storedToken &&
        !currentPath.startsWith("/forgot-password") &&
        !currentPath.startsWith("/resetpassword")
      ) {
        navigate("/login");
      } else if (storedToken && currentPath.startsWith("/login")) {
        navigate("/");
      }
    }
  }, [navigate]);

  return <div>{localStorage.getItem("authToken") ? <Navbar /> : null}</div>;
};

export default Dashboard;
