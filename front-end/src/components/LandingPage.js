import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Login from './Login';

import './LandingPage.scss';
import axios from 'axios';

const LandingPage = (props) => {

  const navigate = useNavigate();

  const login = async() => {
    await axios.get('/login/1')
      .then((res) => {
        console.log("User data: ", {...res.data[0]});
        props.setUser(res.data[0]);
        navigate('/posts');
      })
    
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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

        <button className="login__btn" onClick={login}>Login</button> &nbsp;

        <Button className="login__btn" onClick={handleShow}>
          Register
        </Button>
        <Login user={props.user} setUser={props.setUser} handleClose={handleClose} show={show}/>


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