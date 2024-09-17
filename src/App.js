import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import AppLayout from './Components/AppLayout';
import ApplicationLogin from './Components/ApplicationLogin';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import { PageNotFound } from './Components/PageNotFound';
import Register from './Components/Register';

function App() {
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
