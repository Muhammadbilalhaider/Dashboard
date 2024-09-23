import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import Navbar from './Components/Navbar';

import ApplicationLogin from './Components/ApplicationLogin';
import Login from './Components/Login';
import ContactUs from './Components/ContactUs';

import { PageNotFound } from './Components/PageNotFound';
import Register from './Components/Register';
import AboutUs from './Components/AboutUs';

function App() {

  const AppLayout = () => {
    return (
      <div className="flex flex-col ">
        <Navbar />
        <main>
          <Outlet />
        </main>

      </div>
    )
  }
  return (
    <div>
      <Router>
        {" "}
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/applicationLogin" element={<ApplicationLogin />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
