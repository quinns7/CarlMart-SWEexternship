import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
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

    //const data = {
      //"users": [
        //  {
          //    "name": "alan", 
            //  "age": 23,
           //   "username": "aturing"
          //},
         // {
           //   "name": "john", 
             // "age": 29,
              //"username": "__john__"
        //  }
      //]
    //S}

    //Not functioning properly
    try { fetch('/signup', {  // Enter your IP address here
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
    }
    
    catch(error) {
      console.error('Error sending data to the backend:', error);

    }


  };


  const navigateToLogin = () => {
    navigate('/login'); // Navigate to login page (replace with your login route)
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
