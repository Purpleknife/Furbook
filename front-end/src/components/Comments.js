import React from 'react';

import './Comments.scss';

const Comments = (props) => {
  return (
    <div className='comments-container'>
      <img className='comment-image'
        src={props.commentator_image}
        alt="comment-image"
      />      
      {props.commentator} <br />
      {props.content}

      <hr />
    </div>
  );
}
 
export default Comments;