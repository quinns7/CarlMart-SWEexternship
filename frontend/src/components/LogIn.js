import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LogIn.css'; 
import logo from '../dummy/icon.png'

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup'); // Replace '/signup' with your actual sign-up route
  };


  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="login-logo" />
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div className="signup-prompt">
        Don't have an account? <br />
        <span className="signup-link" onClick={handleNavigateToSignUp}>Create one!</span>
      </div>

    </div>
  );
}
export default LogIn;