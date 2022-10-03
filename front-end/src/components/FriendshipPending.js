import React from "react";

const FriendshipPending = (props) => {
  return (
      <main className="friend-card">
        <div className="friend-info">
          <img className="friend-picture"
            src={props.picture}
          />
          <p>{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button class="btn"><i class="fa-solid fa-messages"></i> Message</button>
          <button class="btn"><i class="fa-solid fa-xmark"></i> Remove</button>
        </div>
      </main>
  );
};

export default FriendshipPending;