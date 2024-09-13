import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import ApplicationLogin from './Components/ApplicationLogin';
import Login from './Components/Login';
import Dashboard from './Components/dashboard';
import ContactUs from './Components/ContactUs';
import AppLayout from './Components/AppLayout';
import Register from './Components/Register';
import { PageNotFound } from './Components/PageNotFound';

function App() {
  return (
    <div>
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
      </Router>
    </div>
  );
}

export default App;
