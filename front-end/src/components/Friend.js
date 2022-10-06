import React from "react";
import './Friend.scss';
import { useNavigate } from 'react-router-dom'

const Friend = (props) => {

  const navigate = useNavigate();
  const date_added = props.date_added.slice(0, 10)
  
  // REMOVE FRIENDSHIP
  const destroy = () => {
    console.log("Destroy function called")
    props.unfriend(props.id);
  };

  // NAVIGATE TO FRIEND'S PROFILE
  const handleClick = (friend_id) => {
    console.log('In friends - navigate to profile id: ', friend_id)
    navigate(`/users/${friend_id}`);
  };

  return (
      <main className="friend-card">
        <div className="friend-info" onClick={() => handleClick(props.id)}>
          <img className="friend-picture"
            src={props.picture}
          />
          <p className="friend-name">{props.first_name} {props.last_name}</p>
          <p className="friend-date">Friends since: {date_added}</p>
        </div>
        <div className="friend-actions">
          <button className="btn"><i className="fa-solid fa-message"></i><br></br><span>Message</span></button>
          <button className="btn" onClick={destroy}><i className="fa-solid fa-xmark"></i><br></br><span>Remove</span></button>
        </div>
      </main>
  );
};

export default Friend;