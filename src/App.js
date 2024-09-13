import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import ApplicationLogin from './Components/ApplicationLogin';
import Login from './Components/Login';
<<<<<<< HEAD
=======
import Dashboard from './Components/dashboard';
import ContactUs from './Components/ContactUs';
import AppLayout from './Components/AppLayout';
import Register from './Components/Register';
import { PageNotFound } from './Components/PageNotFound';
>>>>>>> 5b6abc6f1855199f15cf6a9bf15af5de10d15cc0

function App() {
  return (
    <div>
<<<<<<< HEAD
       <Router>  
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/applicationLogin" element={<ApplicationLogin />} />
      
      </Routes>
=======
      <Router>
        {" "}
        <Routes>

          <Route path="/" element={<AppLayout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/applicationLogin" element={<ApplicationLogin />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>



        </Routes>
>>>>>>> 5b6abc6f1855199f15cf6a9bf15af5de10d15cc0
      </Router>
    </div>
  );
}

export default App;
