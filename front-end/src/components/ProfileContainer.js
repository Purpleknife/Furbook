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

        {props.user.first_name} {props.user.last_name}

        {props.user.relationsip_status}

        {props.user.birthday}

        {props.user.location}
      </div>
      {/* {postsList} */}
    </div>
  );
}
 
export default ProfileContainer;