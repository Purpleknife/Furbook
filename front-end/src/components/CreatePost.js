import { useEffect, useState } from 'react'
import axios from 'axios';

import './CreatePost.scss';


const CreatePost = (props) => {

  const [value, setValue] = useState('')

  const handleClick = async () => {
    await axios.post('/posts', {content: value})
      .then(res => {
        console.log("create post:", res.data[0]);
        console.log("post:", props.posts);
        setValue('');
        props.setPosts([...props.posts, res.data[0]]);
        console.log("post after:", props.posts);
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