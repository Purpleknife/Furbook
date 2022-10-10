import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SideNav.scss';

const SideNav = (props) => {

  const navigate = useNavigate();
  const logout = () => {
    axios.get('/logout')
      .then((data) => {
        console.log('logout data', data);
        props.setUser(null);
      })
  }

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img
          className="side-logo"
          src='../images/logo.png'
          alt="profile"
          onClick={() => navigate('/posts')}
        />
        <span className="side-name" onClick={() => navigate('/posts')}>Furbook</span>
      </div>

      <div className="side-profile" onClick={() => navigate(`/users/${props.user.id}`)}>
        <img
          className="side-profile-image"
          src={props.user.image_url}
          alt="profile"
        />
        <div className='profile-name'>
        <span className="name">{props.user.first_name} {props.user.last_name}</span>
        </div>
      </div>

      <div className="side-friends" onClick={() => navigate('/friendships')}>
        <div className='oval'>
          <img
              className="side-friends-image"
              src='../images/icon-friends.png'
              alt="profile"
          />
        </div>
        {props.pendingCounter ? <span className="pending-badge">{props.pendingCounter}</span> : 0}
        <p className="other-name friends">My Friends</p>
      </div>

      <div className="side-friends chats" onClick={() => navigate('/chat')}>
        <div className='oval'>
          <img
            className="side-friends-image chat-img"
            src='../images/icon-chat.png'
            alt="profile"
          />
        </div>
        <p className="other-name">My Chats</p>
      </div>

      {/* <img
        className="fun"
        src='../images/peekaboo3.png'
        alt="peekaboo"
      /> */}

      <div className="logout">
        <Link className="logout__btn" to="/" onClick={logout}>Logout</Link>
      </div>

      {/* <img
            className="side-footer-image"
            src='../images/corgi.png'
            alt="profile"
        /> */}
      
    </div>
  );
}
 
export default SideNav;