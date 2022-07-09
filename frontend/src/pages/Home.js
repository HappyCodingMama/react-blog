import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import './home.css';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className='container container__home'>
      <Header />
      <div className='container__body'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
