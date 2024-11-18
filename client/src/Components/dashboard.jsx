import React, {
  useEffect,
  useState,
} from 'react';

<<<<<<< HEAD
=======
import { jwtDecode } from 'jwt-decode';
>>>>>>> bilal-branch
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';

const Dashboard = () => {
<<<<<<< HEAD
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem('authToken');
      setToken(currentToken);
      const currentPath = window.location.pathname;
      if (!currentToken && !currentPath.startsWith('/forgot-password') && !currentPath.startsWith('/resetpassword')) {
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
=======
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
>>>>>>> bilal-branch
};

export default Dashboard;
