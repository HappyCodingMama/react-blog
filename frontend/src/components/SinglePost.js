import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import './singlepost.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const postImgUpload = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        categories,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className='container container__singlepost'>
      <div className='singlepost__body'>
        <div className='singlepost__category'>
          <div>
            {updateMode ? (
              <input
                type='text'
                value={categories}
                className='singlepost__categoriesInput'
                autoFocus
                onChange={(e) => setCategories(e.target.value)}
              />
            ) : (
              <small className='singlepost__author'>{categories}</small>
            )}{' '}
            |{' '}
            <small className='singlepost__date'>
              {new Date(post.createdAt).toDateString()}
            </small>
          </div>
        </div>
        {post.photo && (
          <img
            src={postImgUpload + post.photo}
            className='singlepost__img'
            alt=''
          />
        )}

        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlepost__titleInput'
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlepost__title'>
            {title}
            {post.username === user?.username && (
              <div className='singlepost__edit'>
                <AiOutlineEdit
                  className='singlepost__icon'
                  onClick={() => setUpdateMode(true)}
                />
                <AiOutlineDelete
                  className='singlepost__icon'
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}

        <div className='singlepost__info'>
          <small className='singlepost__author'>
            By{' '}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </small>
        </div>
        {updateMode ? (
          <textarea
            className='singlepost__descInput'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className='singlepost__description'>{desc}</p>
        )}
        {updateMode && (
          <button className='btn' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
