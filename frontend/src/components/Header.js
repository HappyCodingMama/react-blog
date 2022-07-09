import React from 'react';
import './header.css';
import HEADERIMG from '../assets/headerimg.jpg';

const Header = () => {
  return (
    <div className='container container__header'>
      <div className='featured__post__info'>
        <a href='' className='category__button'>
          Technology
        </a>
        <h2 className='featured__post__title'>
          <a href=''>Delta reinfection risk low among unvaccinated children</a>
        </h2>
        <p className='featured__post__body'>
          But scientists warn that the findings do not mean that children should
          not be vaccinated against COVID-19.
        </p>
        <div className='featured__post__date-info'>
          <small>June 10, 2022 - 07:23</small>
        </div>
      </div>
      <div className='featured__post__thumbnail'>
        <img src={HEADERIMG} alt='headerImg' />
      </div>
    </div>
  );
};

export default Header;
