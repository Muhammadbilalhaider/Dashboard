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
import SignUp from './Components/SignUp';

function App() {
  const AppLayout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Dashboard />
        <main className="flex  flex-1 h-full  mt-8">
          <Outlet />
        </main>
      </div>
    );
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/applicationLogin" element={<ApplicationLogin />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
