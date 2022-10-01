import { useState,useEffect } from 'react';
import axios from 'axios';
import './GeneralFeed.scss';

import Post from './Post';

const GeneralFeed = (props) => {

  const [posts, setPosts] = useState();
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    await axios.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err));
  }

  // generate list of post components
  const generatePosts = () => {
    const generatedList = posts.map(post => {
      return (
        <Post
          key={post.id}
          content={post.content} 
          creator={post.creator}
          image_url={post.image_url}
        />
      )
    });
    setPostList(generatedList);
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  // Only generate posts when posts is changed
  useEffect(() => {
    if (posts) {
      generatePosts();
    }
  }, [posts])

  return (
    <section className='main-container'>
      <div className='feed-container'>
        {postList}
      </div>
    </section>
  );

}
 
export default GeneralFeed;