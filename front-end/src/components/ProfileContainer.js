import React, { useState, useEffect } from 'react';
import './ProfileContainer.scss';

import axios from 'axios';

import Post from './Post';

const ProfileContainer = (props) => {
  const [editInput, setEditInput] = useState({
    editing: false
    //editedItem: ''
  });
  const [inputName, setInputName] = useState('');
  const [inputRelation, setInputRelation] = useState('');
  const [inputBirthday, setInputBirthday] = useState('');
  const [inputLocation, setInputLocation] = useState('');

  const edit = () => {
    setEditInput({
      editing: true
      //editedItem: item
    });
  };

  let viewMode = {};
  let editMode = {};

  if (editInput.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  };

  // const setUpdate = (updatedInput) => {
  //   setValue(updatedInput);
  // }


  // const onChange = (e) => {
  //   setUpdate(e.target.value);
  // };

  const onKeyDown = (event) => {
    console.log('event key', event.key);
    if (event.key === "Enter") {
      setEditInput({ editing: false })
    }
  };

  // const editProfile = async() => {
  //   await axios.put('/users/1')
  //     .then((res) => {
  //       console.log("axios.post data: ", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   editProfile();
  // }, []);



  const postsList = props.posts.map(post => {
    return (
      <Post
        key={post.id}
        content={post.content} 
        creator={post.creator}
        image_url={post.image_url}
        creator_name={props.user.first_name + ' ' + props.user.last_name}
        creator_image={props.user.image_url}
      />

    )
  });

  return (
    <div className="main">
      <div className="profile-card">
      
        <img
            className="profile-image"
            src={props.user.image_url}
        />
        <div className="profile-info">
          <p><span className="profile-name" style={viewMode}>{ inputName ? inputName : props.user.first_name + ' ' + props.user.last_name}</span>
            <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder={props.user.first_name + ' ' + props.user.last_name}
              value={inputName}
              onChange = {(event) => {
                setInputName(event.target.value)}
              }
              onKeyDown={onKeyDown}
            />
            <span style={viewMode} className="edit" onClick={edit}><i className="fa-solid fa-pen-to-square"></i></span>
          </p>

          <p><span className="profile-title">Relationship Status:</span><span style={viewMode}> {inputRelation ? inputRelation : props.user.relationship_status}</span>
          <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder={props.user.relationship_status}
              value={inputRelation}
              onChange = {(event) => {
                setInputRelation(event.target.value)}
              }
              onKeyDown={onKeyDown}
            />
          </p>

          <p><span className="profile-title">Birthday:</span><span style={viewMode}> {inputBirthday ? inputBirthday : props.user.birthday.slice(0, 10)}</span>
          <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder={props.user.birthday.slice(0, 10)}
              value={inputBirthday}
              onChange = {(event) => {
                setInputBirthday(event.target.value)}
              }
              onKeyDown={onKeyDown}
            />
          </p>

          <p><span className="profile-title">Location:</span><span style={viewMode}> {inputLocation ? inputLocation : props.user.location}</span>
          <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder={props.user.location}
              value={inputLocation}
              onChange = {(event) => {
                setInputLocation(event.target.value)}
              }
              onKeyDown={onKeyDown}
            />
          </p>

          <div className="profile__btns">
          <button className="profile__btn">Wanna chat?</button>&nbsp;
          <button className="profile__btn">Be friends?</button>
          </div>
        </div>
      </div>

      <div className="posts-container">
        {postsList}
      </div>
    </div>
  );
}
 
export default ProfileContainer;