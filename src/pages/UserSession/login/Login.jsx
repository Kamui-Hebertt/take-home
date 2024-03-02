import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from '../../../components/ToastMsg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
  
    console.log('Email:', email);
    console.log('Password:', password);


    try {
    


      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });

      
        //dasdasda
      console.log('User registered successfully:', response.data);
      localStorage.setItem('token', response.data.token);
     
      navigate('/products');
     

    } catch (error) {
      if (error.response && error.response.data) {

        toast.error('Erro: ' + error.response.data.error);
        console.error('Error registering user:', error.response.data.error);
      } else {
        toast.error('Erro ao registrar usuário');
 
        console.error('Erro ', error);
      }
    }


  };

  return (
    <><ToastMsg />
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
    </div></>
  );
};

export default Login;
