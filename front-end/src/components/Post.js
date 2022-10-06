import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import Comments from './Comments';

import './Post.scss';

const Post = (props) => {

  const navigate = useNavigate();

  const [likes, setLikes] = useState();
  const [comments, setComments] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [totalComments, setTotalComments] = useState();

  const [myLikes, setMyLikes] = useState();

  const [color, setColor] = useState('');

  const [editInput, setEditInput] = useState({
    editing: false
  });
  const [inputContent, setInputContent] = useState(props.content);

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

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
    if (event.key === "Enter") {
      setEditInput({ editing: false });
      editPost();
    }
  };
  
  //To edit a post:
  const editPost = async() => {
   await axios.put(`/posts/${props.postID}`, { 
      content: inputContent
     })
      .then((res) => {
        props.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //To delete a post:
  const deletePost = async() => {
    await axios.delete(`/posts/${props.postID}`)
      .then((res) => {
        props.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //To get number of likes in a post:
  const fetchNumberOfLikes = async () => {
    await axios.get(`/posts/postlikes/${props.postID}`)
      .then(res => {
        setLikes(res.data[0].count);
      })
      .catch(e => console.log(e));
  };


  //To get the posts liked by the user:
  const fetchUserLikes = async() => {
    await axios.get(`/posts/postlikes/${props.postID}/users/${props.userID}`)
      .then(res => {
        console.log('DATA HERE', res.data[0])
        setMyLikes(res.data[0].post_id);
      })
      .catch(e => console.log(e));
  }


  //To get the comments of a post:
  const fetchComments = async () => {
    await axios.get(`/posts/comments/${props.postID}`)
      .then(res => {
        console.log("Post Comments:", res.data);

        const commentsContent = res.data.map((com) => {
          return (<Comments
            key={com.content}
            content = {com.content}
            commentator_userID = {com.user_id}
            commentator = {com.first_name + ' ' + com.last_name}
            commentator_image = {com.image_url}
            date = {com.date_added}
          />)
        });
        setComments(commentsContent);
        setTotalComments(commentsContent.length);
      })
      .catch(e => console.log(e));
  };

  
  //To add likes on posts:
  const addLikes = async() => {
    if (myLikes) {
      await axios.delete(`/posts/postlikes/${props.postID}`)
      .then(res => {
        console.log('delete a LIKE', res.data[0])
        fetchUserLikes();
        fetchNumberOfLikes();
        setMyLikes('');
      })
      .catch(e => console.log(e));
    }

    if (!myLikes) {
      await axios.post(`/posts/postlikes/${props.postID}`, {
        post_id: props.postID
      })
        .then(res => {
          fetchUserLikes();
          fetchNumberOfLikes();
        })
        .catch(e => console.log(e));

    }
  };
  

  //To add comments on posts:
  const addComments = async(e) => {
    e.preventDefault();

    await axios.post(`/posts/comments/${props.postID}`,
     { post_id: props.postID,
      content: commentValue}
    )
      .then(res => {
        fetchComments();
        setCommentValue({content: ''}); //Clean up state after submit.
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchNumberOfLikes();
    fetchComments();
    fetchUserLikes();
  }, []);

  useEffect(() => {    
    if (myLikes) {
      setColor("#FF0000");
      console.log('setting color to red here');
    }
    if (!myLikes) {
      setColor("#000000");
      console.log('setting color to black here');
    }
  }, [myLikes])

  const navigateToProfile = (id) => {
    navigate(`/users/${id}`)
  };

  return (
    <div className="post-body">
      <div className='post-title'>
        <img src={props.creator_image} alt='Creators profile' onClick={() => navigateToProfile(props.creator)} />
        <h4 onClick={() => navigateToProfile(props.creator)} >{props.creator_name}<p className='date'>{props.date.slice(0, 10)}</p></h4>
        
        {props.userID === props.creator && 
        <div className="edit-delete">
          <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              <i className="fa-solid fa-ellipsis"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item id="edit" style={viewMode} onClick={edit}><i className="fa-solid fa-pen-to-square"></i> Edit</Dropdown.Item>
              <Dropdown.Item id="delete" onClick={deletePost}><i  className="fa-solid fa-trash"></i> Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>}
      </div>
      <p><span style={viewMode} className="post-content">{inputContent ? inputContent : props.content}</span>
      <input 
        className="input-field-post"
        type="text"
        style={editMode}
        placeholder={props.content}
        value={inputContent}
        onChange = {(event) => {
          setInputContent(event.target.value)}
        }
        onKeyDown={onKeyDown}
      />
      </p>
      {props.image_url && <img className="post-image" src={props.image_url} alt='Pic' />}
      <div className='post-like-comment'>
        
        {/* {myLikes 
        ? <span id="like_btn" onClick={addLikes} style={ {color: `${color}`}}><i className="fa-solid fa-paw"></i>{likes}</span>
        : <span id="like_btn" onClick={removeLikes} style={ {color: `${color}`}}><i className="fa-solid fa-paw"></i>{likes}</span> } */}

        <span id="like_btn" onClick={addLikes} style={ {color: `${color}`}}><i className="fa-solid fa-paw"></i>{likes}</span>

        <span><i className="fa-solid fa-comments"></i>{totalComments}</span>
      </div>
      <div className='post-footer'>
        <form>
          <input
            className='add-comment'
            type="text"
            name='comment'
            value={commentValue.content}
            onChange={handleChange}
            placeholder='Write a comment here...'
          />
          <br />
          <button className="add-comment-btn" onClick={addComments}>Add</button>
        </form>
        {comments}
      </div>
    </div>
  );
}
 
export default Post;

// <span className="dropdown-list" onClick={(e) => {e.target.style.display = 'block'}}>
// <i class="fa-solid fa-ellipsis">
//   <ul className="dropdown-content" >
//     <li>Edit</li>
//     <li>Delete</li>
//   </ul>
// </i>
// </span>