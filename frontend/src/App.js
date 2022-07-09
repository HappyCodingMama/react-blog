import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Write from './pages/Write';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={user ? <Home /> : <Signup />}></Route>
        <Route path='/login' element={user ? <Home /> : <Login />}></Route>
        <Route path='/write' element={user ? <Write /> : <Signup />}></Route>
        <Route
          path='/settings'
          element={user ? <Settings /> : <Signup />}
        ></Route>
        <Route path='/post/:postId' element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
