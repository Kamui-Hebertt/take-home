import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-border">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="create-account-link">Não tem uma conta? <Link to="/register">Crie uma conta</Link>.</p>
      </div>
    </div>
  );
};

export default Login;
