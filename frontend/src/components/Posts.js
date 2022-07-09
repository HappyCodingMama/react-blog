import React from 'react';
import Post from './Post';
import './posts.css';

const Posts = ({ posts }) => {
  return (
    <div className='container__posts'>
      {posts.map((p) => (
        <div>
          <Post post={p} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
