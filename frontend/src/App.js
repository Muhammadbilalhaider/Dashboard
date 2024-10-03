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
import Dashboard from './Components/dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  const AppLayout = () => {
    return (
      <div className="flex w-full flex-col min-h-screen">
        <Dashboard />
        <main className="flex  flex-1 h-full ">
          <Outlet />
        </main>
      </div>
    );
  };
  return (
    <div className='flex bg-slate-100 w-full'>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/applicationLogin" element={<ApplicationLogin />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
