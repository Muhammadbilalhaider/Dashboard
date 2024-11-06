import './App.css';

import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Dashboard from './Components/dashboard';
import ForgotPassword from './Components/ForgotPassword';
import Login from './Components/Login';
import Profile from './Components/Profile';
import ResetPassword from './Components/ResetPassword';
import Setting from './Components/Setting';
import ProductDetails from './Products/...ProductDetails';
import AddProduct from './Products/AddProduct';
import Boots from './Products/Boots';
import Loofers from './Products/Loofers';
import Sneakers from './Products/Sneakers';

function App() {
  const AppLayout = () => {
    return (
      <div className="flex w-full flex-col min-h-screen">
        <Dashboard />
     
        <main className="flex-1 bg-slate-50 pt-16">
          <Outlet />
        </main>
        
     
      </div>
    );
  };
  return (
    <div className="flex w-full">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sneakers" element={<Sneakers />} />
            <Route path="/boots" element={<Boots />} />
            <Route path="/loofers" element={<Loofers />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
