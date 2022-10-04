import { useEffect, useState } from 'react'
import axios from 'axios';

import './CreatePost.scss';


const CreatePost = (props) => {

  const [value, setValue] = useState({
    content: '',
    image_url: ''
  })
  const [addingPhoto, setAddingPhoto] = useState(false);

  const toggleAddFile = () => {
    setAddingPhoto(!addingPhoto);
  }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post('/posts', value)
      .then(res => {

        setValue({
          content: '',
          image_url: ''
        });

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
          type='text'
          name='content'
          value={value.content} 
          onChange={handleChange}
          placeholder='Write a new post...'
        />
        {addingPhoto && (
        <input 
          type='text'
          name='image_url'
          value={value.image_url} 
          onChange={handleChange}
          placeholder='Image url...'
        />
        )}
      </form>
      <div className='create-post__buttons'>
        <button 
          className='create-post__button'
          onClick={toggleAddFile}
        >
          {addingPhoto ? 'Cancel picture' : 'Add picture'}
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