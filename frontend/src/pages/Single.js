import React from 'react';
import './single.css';
import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

const Single = () => {
  return (
    <div className='container container__single'>
      <div className='container__single__body'>
        <SinglePost />
        <Sidebar />
      </div>
    </div>
  );
};

export default Single;
