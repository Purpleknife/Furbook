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
  const [profilePosts, setProfilePosts] = useState(null);
  const [refetch, setRefetch] = useState(true);

  const getUserPosts = async() => {
    await axios.get('/users/1')
      .then((res) => {
        //console.log("Posts data: ", {...res.data});
        setProfilePosts(res.data);
      })
  };

  useEffect(() => {
    console.log('testing in here', refetch);
    if (refetch) {
      getUserPosts();
      setRefetch(false);
    }
  }, [refetch]); //to fix refresh issue, add posts.

  return (
    <React.StrictMode>
    <BrowserRouter>
      {/* DO NOT REMOVE Nav COMPONENT FROM HERE */}
      
      {/* <SideNav user={user} setUser={setUser}/> */}
      <Routes>
        <Route path="/" element={<LandingPage setUser={setUser}/>} />
        <Route path="/users" element={<div className="wrapper"><SideNav user={user} setUser={setUser}/><ProfileContainer user={user} setUser={setUser} profilePosts={profilePosts} setProfilePosts={setProfilePosts} refetch={() => setRefetch(true)}/></div>} />
        <Route path="/posts" element={<><SideNav user={user} setUser={setUser}/><GeneralFeed user={user} refetch={() => setRefetch(true)}/></> }/> 
        <Route path='/friendships' element={<Friendships />} />
        <Route path='/search' element={<LiveSearch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
    
}
 
export default App;
