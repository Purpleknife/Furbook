import { useEffect, useState } from 'react'
import axios from 'axios';

import './CreatePost.scss';


const CreatePost = (props) => {

  const [value, setValue] = useState('')

  const handleClick = async () => {
    await axios.post('/posts', {content: value})
      .then(res => {
        console.log('user object', props.user)
        console.log("Unpacked post data:", {
          ...res.data[0], 
          users_first: props.user.first_name, 
          users_last: props.user.last_name,
          image_url: props.user.image_url
        });
        setValue('');
        props.setPosts([...props.posts, {
          ...res.data[0], 
          users_first: props.user.first_name, 
          users_last: props.user.last_name,
          users_image: props.user.image_url
        }]);
      })
      .catch(err => console.log(err));
  }
  
  return ( 
    <div className='create-post__container'>
      <form>
        <input 
          name='content'
          value={value} 
          onChange={e => setValue(e.target.value)}
          placeholder='Write a new post...'
        />
      </form>
      <div className='create-post__buttons'>
        <button 
          className='create-post__button'
        >
          Add File
        </button>
        <button 
          className='create-post__button'
          onClick={handleClick}
        >
          Post
        </button>
      </div>
    </div>
  );
}
 
export default CreatePost;