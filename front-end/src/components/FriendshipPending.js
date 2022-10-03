import React from "react";
import './FriendshipPending.scss';
import './Friend.scss';

const FriendshipPending = (props) => {
  return (
      <main className="friend-card pending">
        <div className="friend-info">
          <img className="friend-picture"
            src={props.picture}
          />
          <p>{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button className="btn accept">Accept</button>
          <button className="btn decline">Decline</button>
        </div>
      </main>
  );
};

export default FriendshipPending;