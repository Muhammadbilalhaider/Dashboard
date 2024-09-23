import './App.css';

import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import AboutUs from './Components/AboutUs';
import ApplicationLogin from './Components/ApplicationLogin';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { PageNotFound } from './Components/PageNotFound';
import Register from './Components/Register';

function App() {

  const AppLayout = () => {
    return (
      <div className="flex flex-col">
        <Navbar />
        <main className='flex mt-20 h-full'>
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
