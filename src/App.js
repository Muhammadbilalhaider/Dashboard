import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import Navbar from './Components/Navbar';

<<<<<<< HEAD
import ApplicationLogin from './Components/ApplicationLogin';
import Login from './Components/Login';
import ContactUs from './Components/ContactUs';
import Register from './Components/Register';
=======
import AppLayout from './Components/AppLayout';
import ApplicationLogin from './Components/ApplicationLogin';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
>>>>>>> 156378a798102cee5a3495d6039eb4b936883143
import { PageNotFound } from './Components/PageNotFound';
import Register from './Components/Register';

function App() {

  const AppLayout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex pt-6 pb-6">
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
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
