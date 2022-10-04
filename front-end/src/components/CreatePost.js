import { useEffect, useState } from 'react'
import axios from 'axios';

import './CreatePost.scss';


const CreatePost = (props) => {

  const [value, setValue] = useState({
    content: '',
    image_url: ''
  })
  // const [addingPhoto, setAddingPhoto] = useState(false);

  // const toggleAddFile = () => {
  //   setAddingPhoto(!addingPhoto);
  // }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const [image, setImage] = useState('');
  
  const uploadImage = async() => {
    const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloud_name = process.env.REACT_APP_CLOUDNAME;

    //console.log('upload reset', process.env.REACT_APP_UPLOAD_PRESET);

    const files = document.querySelector(".uploadInput").files;
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('upload_preset', upload_preset);
    //data.append('cloud_name', cloud_name);
      fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: formData
      })
      .then(res => 
        //console.log('res here', res)
        res.json())
      .then(res => {        
        setValue({
          ...value,
          image_url: res.secure_url
        })
        console.log('it worked!!!');
      })
      .catch(error => {
        console.log('Upload error', error);
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
        {/* {addingPhoto && (
        <input 
          type='text'
          name='image_url'
          value={value.image_url} 
          //onChange={handleChange}
          placeholder='Image url...'
        />
        )} */}
      </form>
      <div className='create-post__buttons'>


        {/* <button 
          className='create-post__button'
          //onClick={toggleAddFile}
          onChange={(e) => setImage(e.target.files[0])}
        >
          Add picture
          {addingPhoto ? 'Cancel picture' : 'Add picture'}
        </button> */}

        <input type="file" className="uploadInput"></input>
        <button className='upload' onClick={uploadImage}>
          <i className="fa-solid fa-upload"></i>
        </button>
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