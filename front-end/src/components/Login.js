import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Login = (props) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = document.forms[0];
    console.log('DOC FORMS', { email, password });

    axios.get('/users')
      .then(res => {
        console.log('ALL USERs', res.data);

        const allUsers = res.data;
        const findUser = allUsers.find((user) => user.email === email.value);
          if (findUser) {
            if (findUser.password === password.value) {
              const userID = findUser.id;

              axios.get(`/login/${userID}`)
                .then((res) => {
                  console.log("User data: ", {...res.data[0]});
                  props.setUser(res.data[0]);
                  navigate('/posts');
                })
            }
            if (findUser.password !== password.value) {
              alert('Wrong password!');
            }
          }
          if (!findUser) {
            alert('Please register!');
          }
        console.log('FUNCTION findUser', findUser);
      })
      .catch(e => console.log(e));

    
  }

  return (
    <>

      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="dark" onClick={handleSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

 
export default Login;
