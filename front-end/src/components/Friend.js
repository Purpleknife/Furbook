import React from "react";
// import './FriendItem.scss';

const Friend = (props) => {
  return (
    <li>
      <p>{props.friend_id}</p>
    </li>
  );
};

export default Friend;