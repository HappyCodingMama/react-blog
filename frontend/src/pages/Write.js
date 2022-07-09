import React, { useState, useContext } from 'react';
import './write.css';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import axios from 'axios';
import { Context } from '../context/Context';

const Write = () => {
  const [title, setTitle] = useState();
  const [categories, setCategories] = useState();
  const [desc, setDesc] = useState();
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      categories,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  };

  return (
    <div className='container container__write'>
      <div className='form__container'>
        <div className='file__container'>
          {file && (
            <img src={URL.createObjectURL(file)} className='writeImg' alt='' />
          )}
        </div>
        <form className='write__form' onSubmit={handleSubmit}>
          <div className='write__formGroup'>
            <label htmlFor='fileInput'>
              <BsFillPlusSquareFill className='write__icon' />
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <input
              type='text'
              placeholder='Title'
              className='writeInput'
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='write__category'>
            <input
              type='text'
              placeholder='Category'
              className='writeInput'
              autoFocus={true}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            <textarea
              placeholder='Tell your story'
              type='text'
              className='writeInput writeText'
              rows='10'
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className='write__submit'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
