import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';
import logo from '../dummy/icon.png';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }), 
      });

      if (response.ok) {
        // Handle successful login
        navigate('/home'); 
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup'); 
  };


  return (
    <div className="login-container">
      <Link to ="/"> <img src={logo} alt="logo" className="login-logo" /> </Link>
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