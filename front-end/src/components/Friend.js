import React from "react";
import './Friend.scss';
import { useNavigate } from 'react-router-dom'

const Friend = (props) => {

  const navigate = useNavigate();
  
  // REMOVE FRIENDSHIP
  const destroy = () => {
    console.log("Destroy function called")
    props.unfriend(props.id);
  };

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  }

  return (
      <main className="friend-card">
        <div className="friend-info">
          <img className="friend-picture"
            src={props.picture}
            onClick={() => handleClick(props.id)}
          />
          <p>{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button className="btn"><i className="fa-solid fa-message"></i><br></br><span>Message</span></button>
          <button className="btn" onClick={destroy}><i className="fa-solid fa-xmark"></i><br></br><span>Remove</span></button>
        </div>
      </main>
  );
};

export default Friend;