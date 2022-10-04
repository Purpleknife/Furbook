import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

import LandingPage from './components/LandingPage';
import SideNav from './components/SideNav';
import ProfileContainer from './components/ProfileContainer';
import GeneralFeed from './components/GeneralFeed';
import Friendships from './components/Friendships';
import LiveSearch from './components/LiveSearch';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setposts] = useState(null);

  const getUserPosts = async() => {
    await axios.get('/users/1')
      .then((res) => {
        //console.log("Posts data: ", {...res.data});
        setposts(res.data);
      })
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <React.StrictMode>
    <BrowserRouter>
      {/* DO NOT REMOVE Nav COMPONENT FROM HERE */}
      
      {/* <SideNav user={user} setUser={setUser}/> */}
      <Routes>
        <Route path="/" element={<LandingPage setUser={setUser}/>} />
        <Route path="/users" element={<div className="wrapper"><SideNav user={user} setUser={setUser}/><ProfileContainer user={user} posts={posts}/></div>} />
        <Route path="/posts" element={<><SideNav user={user} setUser={setUser}/><GeneralFeed user={user} /></> }/> 
        <Route path='/friendships' element={<Friendships />} />
        <Route path='/search' element={<LiveSearch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
    
}
 
export default App;
