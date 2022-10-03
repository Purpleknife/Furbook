import React from "react";
import './Friend.scss';

const Friend = (props) => {

  // REMOVE FRIENDSHIP
  const destroy = () => {
    console.log("Destroy function called")
    props.unfriend(props.id);
  };

  return (
      <main className="friend-card">
        <div className="friend-info">
          <img className="friend-picture"
            src={props.picture}
          />
          <p>{props.first_name} {props.last_name}</p>
        </div>
        <div className="friend-actions">
          <button className="btn"><i className="fa-solid fa-messages"></i> Message</button>
          <button className="btn" onClick={destroy}><i className="fa-solid fa-xmark"></i> Remove</button>
        </div>
      </main>
  );
};

export default Friend;