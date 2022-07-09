import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='container login__container'>
      <div className='form__container'>
        <form className='login__form' onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <label>Username</label>
          <input
            type='username'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Create Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='btn'>
            Sign Up
          </button>

          <small>
            Already have an account? <Link to='/login'>Log In</Link>
          </small>

          {error && (
            <div className='alert__message error'>
              <p>This is an error message.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
