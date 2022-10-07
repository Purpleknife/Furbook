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
    <div className='all-comments'>
      <div className='comments-container'>
        
        <div className='commentator'  >
          <img
            onClick={() => navigateToProfile(props.commentator_userID)}
            className='comment-image'
            src={props.commentator_image}
            alt="comment-image"
          />
          &nbsp;
          <div className='commentator-info'>
            <span className='name' onClick={() => navigateToProfile(props.commentator_userID)}>{props.commentator}</span>

              <p>{props.content}</p>
          </div>
          <p className='date'><i class="fa-solid fa-pen"></i> {props.date.slice(0, 10)}</p>
          

        </div>
      </div>
    </div>
  );
}
 
export default Comments;