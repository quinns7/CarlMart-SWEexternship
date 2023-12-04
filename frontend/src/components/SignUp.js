import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUp.css'; 
import logo from '../dummy/icon.png'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name, 'Email:', email, 'Password:', password);
    // Add logic to handle sign-up here (e.g., sending data to a server)
  };

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to login page (replace with your login route)
  };

  return (
    <div className="signup-container">
        <img src={logo} alt="logo" className="login-logo" />
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
      <div className="signup-prompt">
        Already have an account? <br />
        <span className="signup-link" onClick={navigateToLogin}>Login!</span>
      </div>
    </div>
  );
}

export default SignUp;
