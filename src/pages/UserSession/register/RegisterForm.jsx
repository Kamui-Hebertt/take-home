import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from '../../../components/ToastMsg';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não conferem');
      return;
    }
    try {
    
      const { confirmPassword, ...postData } = formData
      console.log("dsads", postData);
      console.log(confirmPassword)
      const response = await axios.post('https://takehome-sequelize.onrender.com/api/auth/register', postData);

      toast.success('Conta registrada com sucesso!');

      console.log('User registered successfully:', response.data);
      setTimeout(() => {
        navigate('/');
      }, 3000);

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
    <>
  <ToastMsg />
  <div className="register-wrapper">
    <div className="register-border">
      <h2 className="title">Registrar</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Confirmar senha:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Criar uma conta</button>
      </form>
    </div>
  </div>
</>
  );
};

export default RegisterForm;
