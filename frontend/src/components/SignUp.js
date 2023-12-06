import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from '../dummy/icon.png';

const SignUp = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }), 
      });

      if (response.ok) {
        // Handle successful sign-up
        navigate('/home'); 
      } else {
        // Handle sign-up failure
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const navigateToLogin = () => {
    navigate('/signup'); 
  };

  return (
    <div className="signup-container">
      <Link to ="/"> <img src={logo} alt="logo" className="login-logo" /> </Link>
        <form onSubmit={handleSubmit} className="signup-form">
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <div className="login-prompt">
        Already have an account? <br />
        <span className="login-link" onClick={navigateToLogin}>Login!</span>
      </div>
    </div>
  );
}

export default SignUp;
