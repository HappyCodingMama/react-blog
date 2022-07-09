import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Context } from '../context/Context';
import axios from 'axios';

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  console.log(isFetching);

  return (
    <div className='container login__container'>
      <div className='form__container'>
        <form className='login__form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>Username</label>
          <input
            type='text'
            className='login__input'
            placeholder='Enter your username'
            ref={userRef}
          />
          <label>Password</label>
          <input
            type='password'
            className='login__input'
            placeholder='Enter your password'
            ref={passwordRef}
          />
          <button type='submit' className='btn' disabled={isFetching}>
            Log in
          </button>
          <small>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
