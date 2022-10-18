import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import Comments from './Comments';

import './Post.scss';

const Post = (props) => {

  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [totalComments, setTotalComments] = useState(0);

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

  const editIt = () => {
    setEditInput({ editing: false });
    editPost();
  }
  
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
        const newData = props.data.filter(post => post.id !== res.data[0].id);
        props.setData(newData);
        // Probably don't need the refetch anymore with the additions above. Better state management.
        // props.refetch();
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
      setMyLikes(res.data[0].post_id);
    })
    .catch(e => console.log(e));
  };

  //To get the comments of a post:
  const fetchComments = async () => {
    await axios.get(`/posts/comments/${props.postID}`)
      .then(res => {

        const commentsContent = res.data.map((com) => {
          return (<Comments
            key={com.content}
            content = {com.content}
            commentator_userID = {com.user_id}
            commentator = {com.first_name + ' ' + com.last_name}
            commentator_image = {com.image_url}
            date = {com.date_added}
            comment_id={com.comment_id}
            postID={props.postID}
            refetch={fetchComments}
            current_user={props.userID}
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
        fetchUserLikes();
        fetchNumberOfLikes();
        setMyLikes('');
        console.log("mylikes:", myLikes);
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
  }, [props.refetch]);

  useEffect(() => {    
    if (myLikes) {
      setColor("#FF0000");
    }
    if (!myLikes) {
      setColor("#000000");
    }
  }, [myLikes])

  const navigateToProfile = (id) => {
    navigate(`/users/${id}`)
  };

  return (
    <div className="post-body">

      <div className='post-title'>
        <img src={props.creator_image} alt='Creators profile' onClick={() => navigateToProfile(props.creator)} />

        <span className='creator' onClick={() => navigateToProfile(props.creator)} >{props.creator_name}</span>
        
        {props.userID === props.creator && 
        <div className="edit-delete">
          <Dropdown>
            <Dropdown.Toggle variant="transparent">
              <i className="fa-solid fa-ellipsis"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item id="edit" style={viewMode} onClick={edit}><i className="fa-solid fa-pen-to-square"></i> Edit</Dropdown.Item>
              <Dropdown.Item id="delete" onClick={deletePost}><i  className="fa-solid fa-trash"></i> Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>}
      </div>

      <div className='content'>
      
        <span style={viewMode} className="post-content">{inputContent ? inputContent : props.content}</span>
        <input 
          className="input-field-post"
          type="text"
          style={editMode}
          placeholder={props.content}
          value={inputContent}
          onChange = {(event) => {
            setInputContent(event.target.value)}
          }
        />
        <span style={editMode} className="save" onClick={editIt}><i className="fa-solid fa-floppy-disk"></i></span>
      </div>

      <div className='image-container'>
      {props.image_url && <img className="post-image" src={props.image_url} alt='Pic' />}
      <span className='date'>Posted on: {props.date.slice(0, 10)}</span>
      </div>
      
      
      <div className='post-like-comment'>
        <span 
          id="like_btn" 
          onClick={addLikes}
          style={ {color: `${color}`}}>
        <i className="fa-solid fa-paw"></i>
        {likes}
      </span>

        <span><i className="fa-solid fa-comments"></i>{totalComments}</span>
      </div>

      <div className='post-comment'>
      <img
        alt='creator-image'
        src={props.user_image}
      />
        <form>
          <input
            className='input-comment'
            type="text"
            name='comment'
            value={commentValue.content}
            onChange={handleChange}
            placeholder='Write a comment here...'
          />
          &nbsp;&nbsp;
          <button className="add-comment-btn" onClick={addComments}>Add</button>
        </form>
      </div>

      <div className='comments'>
        {comments}
      </div>

    </div>
  );
}
 
export default Post;