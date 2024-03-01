import React from 'react';
import Login from './pages/UserSession/login/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/UserSession/register/RegisterForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
