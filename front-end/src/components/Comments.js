import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Comments.scss';

const Comments = (props) => {

  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    navigate(`/users/${id}`);
  }
  // onClick={() => navigateToProfile(creator_user_id)}
  return (
    <div className='comments-container'>
      <div className='commentator' onClick={() => navigateToProfile(props.commentator_userID)} >
        <img className='comment-image'
          src={props.commentator_image}
          alt="comment-image"
        />      
        {props.commentator}
      </div>
      {props.content}

      <hr />
    </div>
  );
}
 
export default Comments;