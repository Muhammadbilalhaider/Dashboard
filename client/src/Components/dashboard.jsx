import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("authToken");
      setToken(currentToken);
      const currentPath = window.location.pathname;
      if (
        !currentToken &&
        !currentPath.startsWith("/forgot-password") &&
        !currentPath.startsWith("/resetpassword")
      ) {
        navigate("/login");
      } else if (currentPath.startsWith("/Login")) {
        navigate("/");
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate]);

  return <div>{token ? <Navbar /> : null}</div>;
};

export default Dashboard;
