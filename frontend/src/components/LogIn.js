import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import './LogIn.css'; 
import logo from '../dummy/icon.png';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/signup'); // Replace '/signup' with your actual sign-up route
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);

    try {
      // Send a POST request to your Flask backend using fetch
      const response = await fetch('/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log('Backend Response:', responseData);
      // navigate('/home');

      // Redirect or perform any other actions based on the response
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
    navigate('/home');
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