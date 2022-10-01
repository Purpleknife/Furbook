import React from 'react';
import './SideNav.scss';

const SideNav = (props) => {

  return (
    <div className="sidebar">
      <img
          className="side-logo"
          src='images/side-logo.png'
      />
    <p className="side-name">Furbook</p>

    <div className="side-profile">
      
      <img
          className="side-profile-image"
          src={props.user.image_url}
      />
      <span className="name">{props.user.first_name} {props.user.last_name}</span>
    </div>

    <p className="other-name">My Friends</p>

    <p className="other-name">My Chats</p>
    

    <img
          className="side-footer-image"
          src='images/corgi.png'
      />
      
    </div>
  );
}
 
export default SideNav;