import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import ApplicationLogin from './Components/ApplicationLogin';
import Login from './Components/Login';
import SideNavbar from './Components/SideNav';

function App() {
  return (
    <div>
       <Router>  <SideNavbar />
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/applicationLogin" element={<ApplicationLogin />} />
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;
