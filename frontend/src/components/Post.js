import React from 'react';
import './post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const postImgUpload = 'http://localhost:5000/images/';
  return (
    <div className='container__post'>
      <article className='post'>
        {post.photo && (
          <img
            src={postImgUpload + post.photo}
            className='postImg'
            alt='postImage'
          />
        )}

        <div className='post__info'>
          <div className='postCats'>
            {post.categories.map((c) => (
              <a key={c} className='category__button'>
                {post.categories}
              </a>
            ))}
          </div>
          <Link to={`post/${post._id}`}>
            <h2 className='post__title'>{post.title}</h2>
          </Link>
          <p className='post__description'>{post.desc}</p>
          <div className='post__author'>
            <small className='post__date-info'>
              {new Date(post.createdAt).toDateString()}
            </small>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;
