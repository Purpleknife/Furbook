import React, { useState, useEffect } from 'react';
import './ProfileContainer.scss';

import axios from 'axios';

import Post from './Post';

const ProfileContainer = (props) => {
  const [editInput, setEditInput] = useState({
    editing: false
  });
  const [inputName, setInputName] = useState(props.user.first_name + ' ' + props.user.last_name);
  const [inputRelation, setInputRelation] = useState(props.user.relationship_status);
  const [inputBirthday, setInputBirthday] = useState(props.user.birthday.slice(0, 10));
  const [inputLocation, setInputLocation] = useState(props.user.location);

  const edit = () => {
    setEditInput({
      editing: true
    });
  };

  let viewMode = {};
  let editMode = {};

  if (editInput.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  };

  const onKeyDown = (event) => {
    //console.log('event key', event.key);
    if (event.key === "Enter") {
      setEditInput({ editing: false });
      console.log('this is the onKeyDown fct');
      editProfile();
    }
  };

  const editProfile = async() => {
    console.log('this is the editProfile fct');
    const names = inputName.split(' ');
    await axios.put('/users/1', { 
      first_name: names[0],
      last_name: names[1],
      relationship_status: inputRelation,
      birthday: inputBirthday,
      location: inputLocation
     })
      .then((res) => {
        console.log("axios.put data: ", res.data);
        props.setUser(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = `${props.user.first_name}'s Profile`;
  });

  const postsList = props.profilePosts.map(post => {
    return (
      <Post
        key={post.id}
        userID={props.user.id}
        content={post.content} 
        creator={post.creator}
        image_url={post.image_url}
        creator_name={props.user.first_name + ' ' + props.user.last_name}
        creator_image={props.user.image_url}
        postID={post.id}
        setPosts={props.setProfilePosts}
        posts={props.profilePosts}
        refetch={props.refetch}
      />

    )
  });
  

  // // SEND FRIEND REQUEST === CURRENTLY HARDCODED / NOT FULLY WORKING
  // const sendFriendRequest = () => {
  //   console.log('sendFriendRequest function is called');
  //   const sender = 1;
  //   const receiver = 4;

  //   Axios.post('/friendships/new', {sender, receiver})
  //     .then(() => {
  //       console.log("Friend request has been sent");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // TO IMPLEMENT, add to 'Be Friends" button: onClick={sendFriendRequest}

  return (
    <div className="main">
      <div className="profile-card">
      
        <img
            alt="profile"
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
      <br />
    </div>
  );
}
 
export default ProfileContainer;