import React, { useState } from "react";
import './FriendshipPending.scss';
import './Friend.scss';
import { useNavigate } from 'react-router-dom'

const FriendshipPending = (props) => {

  const navigate = useNavigate();

  // ACCEPT FRIENDSHIP
  const acceptFriendship = () => {
    props.accept(props.id);
    document.querySelector(".friend-title").click();
  };

  // DECLINE FRIENDSHIP
  const declineFriendship = () => {
    props.decline(props.id);
    document.querySelector(".friend-title").click();
  };

  // NAVIGATE TO FRIEND'S PROFILE
  const handleClick = (friend_id) => {
    navigate(`/users/${friend_id}`);
  };

  const checkSender = () => {
    for (const friend of props.friends) {
      if (friend.sender === props.user.id) {
        return true;
      }
    }
  }
  

  return (
      <div className="friend-card-pending">

        <div className="friend-info" onClick={() => handleClick(props.id)}>
          <img className="friend-pending-picture"
            src={props.picture}
            onClick={() => handleClick(props.id)}
          />
          <div className="name">
            <p onClick={() => handleClick(props.id)}>{props.first_name} {props.last_name}</p>
          </div>
        </div>

        <div className="friend-pending-btn">
          {!checkSender() && <button className="btn" onClick={acceptFriendship}><i className="fa-solid fa-user-plus"></i> Accept</button>} &nbsp;&nbsp;
          <button className="btn" onClick={declineFriendship}><i className="fa-solid fa-xmark"></i> {!checkSender() ? 'Decline' : 'Cancel'}</button>
        </div>

      </div>
  );
};

export default FriendshipPending;