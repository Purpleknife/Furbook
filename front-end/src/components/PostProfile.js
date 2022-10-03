import React from 'react';

const PostProfile = (props) => {
  return (
  <div className="post-body">
  <div className='post-title'>
    <img src={props.creator_image} alt='Creators profile' />
    <h4>{props.creator_name}</h4>
  </div>
  <p>{props.content}</p>
  <img className="post-image" src={props.image_url} alt='Pic' />
  <div className='post-like-comment'>
    <i class="fa-solid fa-paw"></i>
    <i class="fa-solid fa-comments"></i>
  </div>
  <div className='post-footer'>
    {/* Comments will go here. Needs logged in users img and a textarea */}
    {/* User pic
    <input placeholder='Write a comment...' /> */}
  </div>
</div>);
}
 
export default PostProfile;