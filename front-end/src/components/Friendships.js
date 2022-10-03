import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
import FriendshipPending from './FriendshipPending';
import './Friendships.scss';

const Friendships = () => {

  // INITIAL STATE
  const [friends, setFriends] = useState([]);
  const [friendsCounter, setFriendsCounter] = useState(0)
  const [pending, setPending] = useState([]);
  const [pendingCounter, setPendingCounter] = useState(0)

  // API CALL
  useEffect(() => {
    axios.get('/friendships')
      .then((res) => {
        console.log("AXIOS FRIENDS DATA: ", res)

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
        setFriendsCounter(confirmedFriendships.length);
        setPending(pendingFriendships);
        setPendingCounter(pendingFriendships.length);
      });
  }, [friendsCounter, pendingCounter]);

  // ACCEPT FRIENDSHIP
  const accept = (friend_id) => {
    axios.put(`/friendships/${friend_id}`);
    console.log("Axios request to accept friendship");

    // Add new friend to the friends state
    let newFriend = {};
    for (const friend of pending) {
      if (friend.id === friend_id) {
        newFriend = friend;
      }
    };
    setFriends((prev) => [...prev, newFriend]);

    // Add 1 in FriendsCounter
    setFriendsCounter(prev => prev + 1);
    console.log("Friends counter :", friendsCounter)
  };

  // DECLINE FRIENDSHIP
  const decline = (friend_id) => {
    axios.delete(`/friendships/${friend_id}`);
    console.log("Axios request to decline friendship");
    
    // Remove the friend from the pending state
    setPending(prev => prev.filter(friend => {
      return friend !== friend_id;
    }));

    // Remove 1 in PendingCounter
    setPendingCounter(prev => prev - 1);
    console.log("Pending requests counter :", pendingCounter)
  };

  // REMOVE FRIENDSHIP
  const unfriend = (friend_id) => {
    axios.delete(`/friendships/${friend_id}`);
    console.log("Axios request to unfriend");
    
    // Remove the friend from the friends state
    setFriends(prev => prev.filter(friend => {
      return friend !== friend_id;
    }));

    // Remove 1 in FriendsCounter
    setFriendsCounter(prev => prev - 1);
    console.log("Friends counter :", friendsCounter)
  };

  // INDIVIDUAL FRIEND COMPONENT FOR PENDING FRIENDSHIPS
  const pendingFriendItem = pending.map(pendingFriend => {
    return (
      <FriendshipPending
        key={pendingFriend.id}
        id={pendingFriend.id}
        first_name={pendingFriend.first_name}
        last_name={pendingFriend.last_name}
        picture={pendingFriend.image_url}
        accept={accept}
        decline={decline}
      />
    )
  });

  // INDIVIDUAL FRIEND COMPONENT FOR CONFIRMED FRIENDSHIPS
  const friendItem = friends.map(friend => {
    return (
      <Friend
        key={friend.id}
        id={friend.id}
        first_name={friend.first_name}
        last_name={friend.last_name}
        picture={friend.image_url}
        unfriend={unfriend}
      />
    )
  });

  return (
    <main>
      <section className='friends'>
        <h2>Friend Requests ({pendingCounter})</h2>
        <section className='friends-list'>
          {pendingFriendItem}
        </section>
      </section>
      <section className='friends'>
        <h2>My Friends ({friendsCounter})</h2>
        <section className='friends-list'>
          {friendItem}
        </section>
      </section>
      
    </main>
  );
};
 
export default Friendships;