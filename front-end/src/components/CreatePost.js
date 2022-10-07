import { useEffect, useState, useRef } from 'react'
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
  
  const uploadImage = async() => {
    const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloud_name = process.env.REACT_APP_CLOUDNAME;

    const files = document.querySelector(".uploadInput").files;
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('upload_preset', upload_preset);
      fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: formData
      })
      .then(res => 
        res.json())
      .then(res => {        
        setValue({
          ...value,
          image_url: res.secure_url
        })
      })
      .catch(error => {
        console.log('Upload error', error);
      })

  }

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post('/posts', value)
      .then(res => {

        setAddingPhoto(false);

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

  // Not working atm
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };
  
  return ( 
    <div className='create-post__container'>
      <form>
        <input 
          type='text'
          name='content'
          value={value.content} 
          onChange={handleChange}
          placeholder='Write a new post...'
          onKeyDown={onKeyDown}
        />
        {addingPhoto && (
        <input type="file" className="uploadInput"></input>
        )}
      </form>
      <div className='create-post__buttons'>


        <button 
          className='create-post__button'
          onClick={toggleAddFile}
        >
          
          {addingPhoto ? 'Cancel picture' : 'Add picture'}
        </button>

        
        {addingPhoto && (<button className='upload' onClick={uploadImage}>
          <i className="fa-solid fa-upload"></i>
        </button>)}
        <button 
          className='create-post__button'
          onClick={handleClick}
        >
          Post
        </button>
        {/* <img src={image} alt="upload-test"/> */}
      </div>
    </div>
  );
}
 
export default CreatePost;