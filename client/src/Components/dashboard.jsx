import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      const decodedToken = jwtDecode(token);
      const name = decodedToken.name || "Anonymous User";

      // Store the user's name in localStorage
      localStorage.setItem("name", name);
      setUserName(name); // Set the user's name in state
      navigate("/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      const name = localStorage.getItem("name");
      console.log("Name isss", name);
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
