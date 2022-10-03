import React from "react";
import './FriendshipPending.scss';
import './Friend.scss';

const FriendshipPending = (props) => {

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

  return (
      <main className="friend-card pending">
        <div className="friend-info">
          <img className="friend-picture"
            src={props.picture}
          />
          <p>{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button className="btn accept" onClick={acceptFriendship}>Accept</button>
          <button className="btn decline" onClick={declineFriendship}>Decline</button>
        </div>
      </main>
  );
};

export default FriendshipPending;