import React from 'react';

const Comments = (props) => {
  return (
    <div className='comments-container'>
      {props.commentator}: {props.content}
    </div>
  );
}
 
export default Comments;