import React, { useState,useContext } from 'react';
import '../styles/LoginStyles.css'; // Import CSS file
import AxiosInstance from '../../helper/AxiosInstance';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
const LoginForm = () => {
  const { setAccount } = useContext(AppContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance().post('admin/loginByAdmin', { username, password });
      if (response.status === true) {
        setErrorMessage('Login success');
        navigate('/Home');
        setAccount(response.admin);
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }

  };

  return (

      <div className='container'>
        <div className="login-container">
          <h2>Welcome admin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Password'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Đăng nhập</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>
      


  );
};

export default LoginForm;