import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SideNav.scss';

const SideNav = (props) => {

  const logout = () => {
    axios.get('/logout')
      .then((data) => {
        console.log('logout data', data);
        props.setUser(null);
      })
  }

  return (
    <div className="sidebar">
      <Link to="/posts" style={{ textDecoration: 'none' }}>
          <img
              className="side-logo"
              src='images/side-logo.png'
              alt="profile"
          />
        <p className="side-name">Furbook</p>
      </Link>

      <Link to="/users" style={{ textDecoration: 'none' }}>
        <div className="side-profile">
          <img
            className="side-profile-image"
            src={props.user.image_url}
            alt="profile"
          />
          <span className="name">{props.user.first_name} {props.user.last_name}</span>
        </div>
      </Link>


      <Link to="/friendships" style={{ textDecoration: 'none' }}>
        <div className="side-friends">
          <img
              className="side-friends-image"
              src='images/friends.jpg'
              alt="profile"
          />
          <p className="other-name">My Friends</p>
        </div>
      </Link>

    <div className="side-friends">
    <img
          className="side-friends-image"
          src='images/chats.jpg'
          alt="profile"
      />
      <p className="other-name">My Chats</p>
    </div>


    <div className="logout">
      <Link className="logout__btn" to="/" onClick={logout}>Logout</Link>
    </div>

    <img
          className="side-footer-image"
          src='images/corgi.png'
          alt="profile"
      />
      
    </div>
  );
}
 
export default SideNav;