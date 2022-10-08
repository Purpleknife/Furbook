import React from 'react';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';

import './Comments.scss';

import axios from 'axios';

const Comments = (props) => {

   //To delete a comment in a post:
   const deleteComment = async() => {
     await axios.delete(`/posts/${props.postID}/comments/${props.comment_id}`)
       .then((res) => {
         props.refetch();
       })
       .catch((error) => {
         console.log(error);
       });
   };
 

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
            alt="comment"
          />
          &nbsp;
          <div className='commentator-info'>
            <span className='name' onClick={() => navigateToProfile(props.commentator_userID)}>{props.commentator}</span>


            {props.current_user === props.commentator_userID && 
              <div className="delete-btn">
                <Dropdown>
                  <Dropdown.Toggle variant="transparent">
                    <i className="fa-solid fa-ellipsis"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item id="delete" onClick={deleteComment}><i className="fa-solid fa-trash"></i> Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>}

              <p>{props.content}</p>
          </div>
          <p className='date'><i className="fa-solid fa-pen"></i> {props.date.slice(0, 10)}</p>
          

        </div>
      </div>
    </div>
  );
}
 
export default Comments;