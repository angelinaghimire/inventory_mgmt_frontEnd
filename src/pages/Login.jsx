import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import "../stylesheets/authpage.css"

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send a request to the backend to authenticate the user
    // const response = await axios.post('/api/authenticate', { username, password });
    // Store the JWT in local storage or a cookie
    // localStorage.setItem('token', response.data.token);

    // Set isLoggedIn to true
    console.log('Setting isLoggedIn to true');
  setIsLoggedIn(true);

  console.log('logged in');
  navigate('/');
  };

  return (
    <div>
        <Header />
      <h1 className='hd'>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p className='link-btn'>
      <Link to="/register">Don't have an account? Register here.</Link>
      </p>
    </div>
  );
};

export default Login;
