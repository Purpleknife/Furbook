import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './LandingPage.scss';
import axios from 'axios';

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = async (e) => {

    await axios.get('/login/1')
      const userData = await axios.get('/users');
      setUser(userData.data[0]);
      navigate('/users');
  };

  return (

    <div className="landing-page">
      <img
          className="cover"
          src='images/logo.png'
      />

      <p className="app-name">Furbook</p>

      <div className='slogon'>
        <p>Do you feel like your human doesn't give you enough attention?</p>
        <p>Do you think sometimes that you should put yourself out there?</p>
        <p>Make friends, find true love or <i>maybe just gossip about your human?</i></p>
        <p>If yes, <span id='logo'>Furbook</span> is the place for you!</p>


        <Link className="login__btn" to="/users" onClick={login}>
            Login
        </Link>

      </div>

      <div className="footer">
        <img
          className="dog"
          src='images/dog.png'
        />

        <img
          className="cat"
          src='images/cat.png'
        />

      </div>


    </div>
  );
}
 
export default LandingPage;