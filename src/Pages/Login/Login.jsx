import { useState } from 'react';
import React from 'react';
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Default user (store in localStorage once)
  const defaultUser = {
    email: "admin@metacore.com",
    password: "metacore@admin123"
  };

  // Save to localStorage if not already
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(defaultUser));
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));

 function handleLogin(e) {
  e.preventDefault();

  if (email === '' || password === '') {
    setMessage("Fields cannot be blank");
    setTimeout(() => setMessage(''), 10000);
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    setMessage("Login Successful");
    setTimeout(() => setMessage(''), 10000);
    navigate('/dashboard');
  } else {
    setMessage("Invalid Credentials");
    setTimeout(() => setMessage(''), 10000);
  }
}

  return (
    <div className="container">
      <div className="login-box">
        <img src={Logo} alt="logo" className="logo" />
        <h2>Welcome to MetaCore</h2>
        <p>Please sign in to continue</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => {setEmail(e.target.value);setMessage('');}}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);setMessage('');}}
          />
          <p  className={`message ${
             message === "Login Successful" ? "success" : 
            message ? "error" : ""
            }`}>
              {message}
          </p>
          <button type="submit">Sign In</button>
        </form>
        <div className="admin-info">
          <p>Admin credentials:</p>
          <p>Email: admin@metacore.com</p>
          <p>Password: metacore@admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;