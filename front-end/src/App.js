import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

import LandingPage from './components/LandingPage';
import SideNav from './components/SideNav';
import ProfileContainer from './components/ProfileContainer';
import GeneralFeed from './components/GeneralFeed';
import Friendships from './components/Friendships';
import Chat from './components/Chat';

const App = () => {
  const [user, setUser] = useState(null);
  //const [profilePosts, setProfilePosts] = useState(null);
  const [refetch, setRefetch] = useState(true);

  // const getUserPosts = async() => { //this route doesn't work !!!
  //   await axios.get(`/users/${user.user_id}`)
  //     .then((res) => {
  //       console.log("Posts data profilePosts: ", res.data);
  //       setProfilePosts(res.data);
  //     })
  // };

  useEffect(() => {
    console.log('testing in here', refetch);
    if (refetch) {
      //getUserPosts();
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
        <Route path="/users/:id" element={<div className="wrapper"><SideNav user={user} setUser={setUser}/><ProfileContainer user={user} setUser={setUser} refetch={() => setRefetch(true)}/></div>} />
        <Route path="/posts" element={<><SideNav user={user} setUser={setUser}/><GeneralFeed user={user} refetch={() => setRefetch(true)}/></> }/> 
        <Route path='/friendships' element={<><SideNav user={user} setUser={setUser}/><Friendships /></>} />
        <Route path='/chat' element={<Chat user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
    
}
 
export default App;
