import React, { useState, useEffect } from 'react';
import './ProfileContainer.scss';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Post from './Post';

const ProfileContainer = (props) => {
  // Params stores dynamic id's. Like express did with /users/:id. This is coming from Router on App.js
  const params = useParams();
  const [firstLoad, setFirstLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [editable, setEditable] = useState(false);
  const [friendButton, setFriendButton] = useState('');
  
  const [editInput, setEditInput] = useState({
    editing: false
  });
  const [userId, setUserId] = useState(null);
  const [inputName, setInputName] = useState(props.user.first_name + ' ' + props.user.last_name);
  const [inputRelation, setInputRelation] = useState(props.user.relationship_status);
  const [inputBirthday, setInputBirthday] = useState(props.user.birthday.slice(0, 10));
  const [inputLocation, setInputLocation] = useState(props.user.location);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();


  const fetchUser = async (id) => { 

    await axios.get(`/users/Profile/${id}`)
      .then(res => {
        setUserId(res.data[0].users_id);
        setInputName(`${res.data[0].first_name} ${res.data[0].last_name}`);
        setInputRelation(res.data[0].relationship_status);
        setInputBirthday(res.data[0].birthday.slice(0, 10));
        setInputLocation(res.data[0].location);
        setImageUrl(res.data[0].users_image_url);

        let friendFound = false;

        for (const friend of props.friends) {
          if (friend.receiver === res.data[0].users_id || friend.sender === res.data[0].users_id) {
            friendFound = true;
            break;
          }
        }

        if (!friendFound) {
          setFriendButton('Add friend?');
        }

        for (const friend of props.pendingFriends) {
          if (friend.receiver === res.data[0].users_id || friend.sender === res.data[0].users_id) {
            setFriendButton('Pending');
            break;
          }
        }

        if (res.data[0].users_id === props.user.id) {
          setEditable(true);
        }
      })
      .catch(e => console.log(e));

    await axios.get(`/users/${id}`)
      .then(res => {
        setPosts(res.data);
      })
      .catch(e => console.log(e));
  };

  if (firstLoad){
    fetchUser(params.id);
    setFirstLoad(false);
  }

  useEffect(() => {
    if (params.id !== userId) {
      fetchUser(params.id);
    }
  }, [params.id, props.refetch])

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

  const editIt = () => {
    setEditInput({ editing: false });
      editProfile();
  }

  const editProfile = async() => {
    const names = inputName.split(' ');
    await axios.put(`/users/${posts[0].users_id}`, { 
      first_name: names[0],
      last_name: names[1],
      relationship_status: inputRelation,
      birthday: inputBirthday,
      location: inputLocation
    })
    .then((res) => {
      props.setUser(res.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    document.title = `${props.user.first_name}'s Profile`;
  }, [posts]);

  // CREATE A NEW CHAT CONVO AND REDIRECT TO CHAT PAGE
  const startMessage = () => {
    const config = {
      headers:{
        "Project-ID": "8d68967f-e10d-4bbb-8e1b-d14f5592c345",
        "User-Name": "Cindy",
        "User-Secret": "cindyclawford"
      }
    };
    const friendUsername = inputName.split(" ")[0];
    const chatDetails = {
      usernames: ['Cindy', friendUsername],
      is_direct_chat: true
    };
 
    axios.put('https://api.chatengine.io/chats/', chatDetails, config)
      .then(res => {
        navigate('/chat');
      })
      .catch(e => console.log("startMessage Axios request Error :", e));
  };

  // New postsList for dynamic profile loading
  const postsList = posts.map(post => {
    return (
      <Post
        key={post.id}
        userID={props.user.id}
        content={post.content} 
        creator={post.creator}
        image_url={post.image_url}
        creator_name={inputName}
        creator_image={post.users_image_url}
        postID={post.id}
        refetch={props.refetch}
        date={post.date_posted}
        user_image={imageUrl}
        posts={posts}
        setPosts={setPosts}
      />
    );
  });

  // // SEND FRIEND REQUEST === CURRENTLY HARDCODED / NOT FULLY WORKING
  const sendFriendRequest = () => {
    const sender = props.user.id;
    const receiver = userId;

    if (friendButton === 'Pending') {
      return;
    }

    axios.post('/friendships/new', {sender, receiver})
      .then((res) => {
        const firstLastNames = inputName.split(' ');

        const newPending = [
          ...props.pendingFriends,
          {
            birthday: inputBirthday,
            date_added: res.data.rows[0].date_added,
            first_name: firstLastNames[0],
            id: res.data.rows[0].id,
            image_url: imageUrl,
            last_name: firstLastNames[1],
            location: inputLocation,
            password: 'password',
            receiver: receiver,
            relationship_status: inputRelation,
            sender: sender,
            status: false
          }
        ]
        props.setPendingFriends(newPending);
        props.setPendingCounter(prev => prev + 1);
        setFriendButton('Pending');
      })
      .catch((error) => {
        console.log(error);
    });
  };
  
  return (
    <div className="main">
      <div className="profile-card">
      
        <div className='profile-image__container'>
          <img
              alt="profile"
              className="profile-image"
              src={imageUrl}
          />
          {editable && <span style={viewMode} className="edit" onClick={edit}><i className="fa-solid fa-pen-to-square"></i></span>}
          {editable && <span style={editMode} className="save" onClick={editIt}><i className="fa-solid fa-floppy-disk"></i></span>}
          <p>
            <span className="profile-name" style={viewMode}>{ inputName ? inputName : ''}</span>
            <input 
              className="input-field input-name"
              type="text"
              style={editMode}
              placeholder=''
              value={inputName}
              onChange = {(event) => {
                setInputName(event.target.value)}
              }
            />
          </p>

        </div>
        <div className="profile-info">
          <p><span className="profile-title">Relationship Status: </span><span style={viewMode}> {inputRelation ? inputRelation : ''}</span>
            <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder=''
              value={inputRelation}
              onChange = {(event) => {
                setInputRelation(event.target.value)}
              }
            />
          </p>
          <p><span className="profile-title">Birthday:</span><span style={viewMode}> {inputBirthday ? inputBirthday : ''}</span>
          <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder=''
              value={inputBirthday}
              onChange = {(event) => {
                setInputBirthday(event.target.value)}
              }
            />
          </p>

          <p><span className="profile-title">Location:</span><span style={viewMode}> {inputLocation ? inputLocation : ''}</span>
          <input 
              className="input-field"
              type="text"
              style={editMode}
              placeholder=''
              value={inputLocation}
              onChange = {(event) => {
                setInputLocation(event.target.value)}
              }
            />
          </p>
        </div>

        <div className="profile__btns">
          {!editable && <button className="profile__btn" onClick={startMessage}><i className="fa-solid fa-message"></i> Message</button>}
          {!editable && friendButton && <button className="profile__btn" onClick={sendFriendRequest}><i class="fa-solid fa-spinner"></i> {friendButton}</button>}{/* Be friends? */}
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