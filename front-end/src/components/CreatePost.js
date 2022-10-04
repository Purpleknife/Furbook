import { useEffect, useState } from 'react'
import axios from 'axios';

import './CreatePost.scss';


const CreatePost = (props) => {

  const [value, setValue] = useState('')

  const handleClick = async () => {
    await axios.post('/posts', {content: value})
      .then(res => {

        setValue('');

        const newPost = {
          ...res.data[0], 
          users_first: props.user.first_name, 
          users_last: props.user.last_name,
          users_image: props.user.image_url
        };
        let oldPosts = [...props.posts];
        oldPosts.unshift(newPost);

        //props.setPosts(oldPosts);
        props.refetch();
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