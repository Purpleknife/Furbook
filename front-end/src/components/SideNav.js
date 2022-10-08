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
      <Link to="/posts" style={{ textDecoration: 'none' }}>
        <div className="logo-section">
          <img
            className="side-logo"
            src='../images/logo.png'
            alt="profile"
          />
          <span className="side-name">Furbook</span>
        </div>
      </Link>

      <Link to={`/users/${props.user.id}`} style={{ textDecoration: 'none' }}>
        <div className="side-profile">
          <img
            className="side-profile-image"
            src={props.user.image_url}
            alt="profile"
          />
          <div className='profile-name'>
          <span className='hey'>Hey,</span>
          <span className="name">{props.user.first_name} {props.user.last_name}</span>
          </div>
        </div>
      </Link>


      <Link to="/friendships" style={{ textDecoration: 'none' }}>
        <div className="side-friends">
          <div className='oval'>
            <img
                className="side-friends-image"
                src='../images/icon-friends.png'
                alt="profile"
            />
          </div>
          <p className="other-name">My Friends ({props.pendingCounter ? props.pendingCounter + ' Pending' : 0})</p>
        </div>
      </Link>

      <Link to="/chat" style={{ textDecoration: 'none' }}>
        <div className="side-friends chats">
          <div className='oval'>
            <img
              className="side-friends-image chat-img"
              src='../images/icon-chat.png'
              alt="profile"
            />
          </div>
          <p className="other-name">My Chats</p>
        </div>
      </Link>

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