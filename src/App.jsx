import React from 'react';
import Login from './pages/UserSession/login/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/UserSession/register/RegisterForm';
import Products from './pages/mainProducts/Products'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
