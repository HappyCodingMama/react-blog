import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { FiInstagram } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('/categories');
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className='container__sidebar'>
      <div className='sidebar__item'>
        <h2 className='sidebar__title'>ABOUT BLOG</h2>
        <p>
          Nature Portfolio is here to serve the research community by publishing
          its most significant discoveries—findings that advance knowledge and
          address some of the greatest challenges that we face as a society
          today.
        </p>
      </div>
      <div className='sidebar__item'>
        <h2 className='sidebar__title'>CATEGORIES</h2>
        <ul className='sidebar__list'>
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`}>
              <li className='sidebar__listItem' key={c.name}>
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='sidebar__item'>
        <h2 className='sidebar__title'>FOLLOW US</h2>
        <div className='sidebar__social'>
          <FiInstagram className='sidebar__icon' />
          <FaFacebook className='sidebar__icon' />
          <FiInstagram className='sidebar__icon' />
          <FaFacebook className='sidebar__icon' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
