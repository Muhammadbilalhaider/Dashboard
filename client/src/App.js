import "./App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Dashboard from "./Components/dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import Profile from "./Components/Profile";
import Setting from "./Components/Setting";

function App() {
  const AppLayout = () => {
    return (
      <div className="flex w-full flex-col min-h-screen">
        <Dashboard />
        <main className="flex flex-1 h-full lg:p-10  bg-slate-50">
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
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
