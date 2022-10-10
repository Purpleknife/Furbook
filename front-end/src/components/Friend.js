import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Friend.scss';

const Friend = (props) => {

  const navigate = useNavigate();
  const date_added = props.date_added.slice(0, 10)
  
  // REMOVE FRIENDSHIP
  const destroy = () => {
    props.unfriend(props.id);
  };

  // NAVIGATE TO FRIEND'S PROFILE
  const handleClick = (friend_id) => {
    navigate(`/users/${friend_id}`);
  };

  // CREATE A NEW CHAT CONVO AND REDIRECT TO CHAT PAGE
  const startMessage = () => {
    const config = {
      headers:{
        "Project-ID": "8d68967f-e10d-4bbb-8e1b-d14f5592c345",
        "User-Name": "Cindy",
        "User-Secret": "cindyclawford"
      }
    };
    const chatDetails = {
      usernames: ['Cindy', props.first_name],
      is_direct_chat: true
    };
 
    axios.put('https://api.chatengine.io/chats/', chatDetails, config)
      .then(res => {
        navigate('/chat');
      })
      .catch(e => console.log("startMessage Axios request Error :", e));
  };

  return (
      <div className="friend-profile">
        
        <div className="friend-details" onClick={() => handleClick(props.id)}>
          <img className="friend-picture"
            src={props.picture}
          />

          <div className="info">
            <span className="friend-name" onClick={() => handleClick(props.id)}>{props.first_name} {props.last_name}</span><br />
            <p className="friend-date">Friends since: {date_added}</p>
          </div>

        </div>

        <div className="friend-btn">
          <button className="btn" onClick={startMessage}><i className="fa-solid fa-message"></i> Message</button> &nbsp;&nbsp;
          <button className="btn" onClick={destroy}><i className="fa-solid fa-xmark"></i> Remove</button>
        </div>

      </div>
  );
};

export default Friend;