import React from "react";
import './FriendshipPending.scss';
import './Friend.scss';
import { useNavigate } from 'react-router-dom'

const FriendshipPending = (props) => {

  const navigate = useNavigate();

  // ACCEPT FRIENDSHIP
  const acceptFriendship = () => {
    console.log("AcceptFriendship function called")
    props.accept(props.id);
  };

  // DECLINE FRIENDSHIP
  const declineFriendship = () => {
    console.log("declineFriendship function called")
    props.decline(props.id);
  };

  // NAVIGATE TO FRIEND'S PROFILE
  const handleClick = (friend_id) => {
    console.log('In friends - navigate to profile id: ', friend_id)
    navigate(`/users/${friend_id}`);
  };

  return (
      <main className="friend-card pending">
        <div className="friend-info" onClick={() => handleClick(props.id)}>
          <img className="friend-picture"
            src={props.picture}
          />
          <p className="pending-name">{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button className="btn accept" onClick={acceptFriendship}><i class="fa-solid fa-user-plus"></i><br></br><span>   Accept</span></button>
          <button className="btn decline" onClick={declineFriendship}><i className="fa-solid fa-xmark"></i><br></br><span>   Decline</span></button>
        </div>
      </main>
  );
};

export default FriendshipPending;