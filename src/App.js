import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicationLogin from "./Components/ApplicationLogin";
import Login from "./Components/Login";
import SideNavbar from "./Components/SideNav";

import Dashboard from "./Components/dashboard";
function App() {
  return (
    <div>
      <Router>
        {" "}
        {/* <SideNavbar /> */}
        <Dashboard />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/applicationLogin" element={<ApplicationLogin />} />
          {/* <Route path="/PageNotFound" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
