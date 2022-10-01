import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
// import './Friendships.scss';

const Friendships = () => {
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    axios.get('/friendships')
      .then((res) => {
        console.log("Friends data from Axios request: ", res.data);
        setFriends(res.data);
      })
  };

  useEffect(() => {
    getFriends();
  }, []);

  const friendItem = friends.map(friend => {
    return (
      <Friend
        key={friend.id}
        friend_id={friend.receiver}
      />
    )
  });

  return (
    <main>
      <div className="test">FRIENDSHIPS</div>
      <div>{friendItem}</div>
    </main>
  );
};
 
export default Friendships;