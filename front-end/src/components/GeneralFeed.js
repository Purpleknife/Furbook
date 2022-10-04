import { useState,useEffect } from 'react';
import axios from 'axios';
import './GeneralFeed.scss';

import Post from './Post';
import CreatePost from './CreatePost';

const GeneralFeed = (props) => {

  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    await axios.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err));
  }

  // generate list of post components
  const generatePosts = async () => {
    const generatedList = await posts.map(post => {
      return (
        <Post
          key={post.id}
          content={post.content} 
          creator={post.creator}
          image_url={post.image_url}
          creator_name={post.users_first + ' ' + post.users_last}
          creator_image={post.users_image}
        />
      )
    });
    setPostList(generatedList);
    console.log("Set postList");
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  // Only generate posts when posts is changed
  useEffect(() => {
    if (posts) {
      generatePosts();
      console.log("Ran generatePosts");
    }
  }, [posts])

  return (
    <section className='main-container'>
      <div className='create-post-container'>
        <CreatePost posts={posts} setPosts={setPosts} user={props.user} />
      </div>
      <div className='feed-container'>
        {console.log("Postlist from generalfeed return", postList)}
        {postList}
      </div>
    </section>
  );

}
 
export default GeneralFeed;