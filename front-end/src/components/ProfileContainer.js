import React from 'react';
import './ProfileContainer.scss';


const ProfileContainer = (props) => {

  // const postsList = props.posts.map(post => {
  //   return (
  //     post.content

  //   )
  // });

  return (
    <div className="main">
      <div className="profile-card">
      <img
          className="profile-image"
          src={props.user.image_url}
      />
      <div className="profile-info">
        <p>{props.user.first_name} {props.user.last_name}</p>

        <p>Relationship Status: {props.user.relationship_status}</p>

        <p>Birthday: {props.user.birthday}</p>

        <p>Location:{props.user.location}</p>

        <div className="profile__btns">
        <button className="profile__btn">Message</button>&nbsp;
        <button className="profile__btn">Friend Request</button>
        </div>
      </div>


      </div>
      {/* {postsList} */}
    </div>
  );
}
 
export default ProfileContainer;