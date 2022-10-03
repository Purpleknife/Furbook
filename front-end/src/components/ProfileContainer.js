import React from 'react';
import './ProfileContainer.scss';

import Post from './Post';

const ProfileContainer = (props) => {

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
          <p><span className="profile-name">{props.user.first_name} {props.user.last_name}</span></p>

          <p><span className="profile-title">Relationship Status:</span> {props.user.relationship_status}</p>

          <p><span className="profile-title">Birthday:</span> {props.user.birthday.slice(0, 10)}</p>

          <p><span className="profile-title">Location:</span> {props.user.location}</p>

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