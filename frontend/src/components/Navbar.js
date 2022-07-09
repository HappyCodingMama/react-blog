import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useContext } from 'react';
import { Context } from '../context/Context';
import Dropdown from './Dropdown';

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const [dropdown, setDropdown] = useState(false);

  return (
    <nav>
      <div className='container nav__container'>
        <div>
          <Link to={'/'} className='nav__logo'>
            TECHTREE
          </Link>
        </div>
        <ul className='nav__search'>
          <li>
            <form action='' className='container search__bar-container'>
              <div className='search__bar'>
                <BiSearch className='search__barIcon' />
                <input type='search' name='' placeholder='Search' />
              </div>
            </form>
          </li>
        </ul>
        <div className='nav__menu__container'>
          <ul className='nav__items'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>

            {user ? (
              <li onClick={handleLogout}>
                <Link to={'/'}>Logout</Link>
              </li>
            ) : (
              <Link to={'/login'}>Log in </Link>
            )}
          </ul>
        </div>
        {user && (
          <>
            <ul>
              <li
                className='nav__button openBtn'
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                My page
                {dropdown && <Dropdown />}
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
