import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
import './Friendships.scss';

const Friendships = () => {

  // INITIAL STATE
  const [state, setState] = useState({
    friends: [],
    pending: []
  });

  // API CALLS
  useEffect(() => {
    Promise.all([
      axios.get('/friendships'),
      axios.get('/friendships/pending')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        friends: all[0].data,
        pending: all[1].data
      }));
    });
  }, [])

  // INDIVIDUAL FRIEND COMPONENT
  const friendItem = state.friends.map(friend => {
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