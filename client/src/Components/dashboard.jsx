import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

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
      const email = decodedToken.email || "Anonymous User";

      // Store the user's name in localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      setUserName(name);

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
