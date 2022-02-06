import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginOrRegister.scss'

const LoginOrRegister = () => {
  const navigate = useNavigate()

  const handleLoginButton = () => {
      navigate("/login")
  }

  const handleRegisterButton = () => {
      navigate("/register")
  }

  return <div className='login-or-register-box'>
      <div className='login-or-register'>
        <button type='button' onClick={handleLoginButton}>Log in</button>
        <button type='button' className='button-register' onClick={handleRegisterButton}>Register</button>
      </div>
  </div>;
}

export default LoginOrRegister;
