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
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [pendingCounter, setPendingCounter] = useState(0)

  // const getUserPosts = async() => { //this route doesn't work !!!
  //   await axios.get(`/users/${user.user_id}`)
  //     .then((res) => {
  //       console.log("Posts data profilePosts: ", res.data);
  //       setProfilePosts(res.data);
  //     })
  // };
  
  // API CALL
  useEffect(() => {
    axios.get('/friendships')
      .then((res) => {
        // Separate confirmed friendships from pending friendships
        const confirmedFriendships = [];
        const pendingFriendships = [];
        
        for (const friendship of res.data) {
          if (friendship.status === true) {
            confirmedFriendships.push(friendship);
          } else {
            pendingFriendships.push(friendship);
          };
        };
 
        setFriends(confirmedFriendships);
        setPendingFriends(pendingFriendships)
        setPendingCounter(pendingFriendships.length);
      });
  }, [user]);

  useEffect(() => {
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
        <Route path="/users/:id" element={<div className="wrapper"><SideNav user={user} setUser={setUser} pendingCounter={pendingCounter} /><ProfileContainer user={user} setUser={setUser} pendingFriends={pendingFriends} friends={friends} refetch={() => setRefetch(true)}/></div>} />
        <Route path="/posts" element={<><SideNav user={user} setUser={setUser} pendingCounter={pendingCounter} /><GeneralFeed user={user} refetch={() => setRefetch(true)}/></> }/> 
        <Route path='/friendships' element={<><SideNav user={user} setUser={setUser} pendingCounter={pendingCounter} /><Friendships setFriends={setFriends} setPendingFriends={setPendingFriends} setPendingCounter={setPendingCounter} /></>} />
        <Route path='/chat' element={<Chat user={user} setUser={setUser} pendingCounter={pendingCounter}  />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
    
}
 
export default App;
