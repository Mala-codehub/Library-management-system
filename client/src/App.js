import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import Admin from "./Admin";
import AdminDashboard from './AdminDashboard'; 
import UserDetails from './UserDetails';

import 'bootstrap/dist/css/bootstrap.min.css'; 
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
