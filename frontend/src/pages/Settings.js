import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { Context } from '../context/Context';
import { RiUserSettingsLine } from 'react-icons/ri';
import './settings.css';
import axios from 'axios';

const Settings = () => {
  const profileImgUpload = 'http://localhost:5000/images/';

  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  return (
    <div className='container container__settings'>
      <div className='settings__body__container'>
        <div className='settings__body'>
          <div className='settings__title'>
            <h2 className='settings__updateTitle'>Update Your Acount</h2>
            <h2 className='settings__deleteTitle'>Delete Account</h2>
          </div>
          <form action='' className='settings__form' onSubmit={handleSubmit}>
            <label htmlFor=''>Profile Image</label>
            <div className='settings__proPhoto'>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : profileImgUpload + user.profilePic
                }
                alt=''
              />
              <label htmlFor='fileInput'>
                <RiUserSettingsLine className='settings__photoIcon' />
              </label>
              <input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type='text'
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn settingsSubmit' type='submit'>
              Update Profile
            </button>
            {success && (
              <small className='alert__message success'>
                Profile has been updated
              </small>
            )}
          </form>
        </div>
        <Sidebar className='settings__sidebar' />
      </div>
    </div>
  );
};

export default Settings;
