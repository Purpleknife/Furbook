import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
import FriendshipPending from './FriendshipPending';
import './Friendships.scss';

const Friendships = () => {

  // INITIAL STATE
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);

  // API CALL
  useEffect(() => {
    axios.get('/friendships')
      .then((res) => {
        console.log("AXIOS FRIENDS DATA: ", res)
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
        setPending(pendingFriendships);
      });
  }, []);

  // INDIVIDUAL FRIEND COMPONENT FOR PENDING FRIENDSHIPS
  const pendingFriendItem = pending.map(pendingFriend => {
    return (
      <FriendshipPending
        key={pendingFriend.id}
        first_name={pendingFriend.first_name}
        last_name={pendingFriend.last_name}
        picture={pendingFriend.image_url}
      />
    )
  });

  // INDIVIDUAL FRIEND COMPONENT FOR CONFIRMED FRIENDSHIPS
  const friendItem = friends.map(friend => {
    return (
      <Friend
        key={friend.id}
        first_name={friend.first_name}
        last_name={friend.last_name}
        picture={friend.image_url}
      />
    )
  });

  return (
    <main>
      <section className='pending'>
        <h2>Friend Requests</h2>
        <section className='pending-list'>
          {pendingFriendItem}
        </section>
      </section>
      <section className='friends'>
        <h2>My Friends</h2>
        <section className='friends-list'>
          {friendItem}
        </section>
      </section>
      
    </main>
  );
};
 
export default Friendships;