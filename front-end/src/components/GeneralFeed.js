import { useState,useEffect } from 'react';
import axios from 'axios';
import './GeneralFeed.scss';

import Post from './Post';
import CreatePost from './CreatePost';
import LiveSearch from './LiveSearch';

const GeneralFeed = (props) => {

  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState([])
  const [refetch, setRefetch] = useState(true);

  const fetchPosts = async () => {
    await axios.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err));
  }

  const updateRefetch = () => {
    setRefetch(true);
    console.log('props refetch here', props.refetch);
    props.refetch();
  };

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
          setPosts={setPosts}
          userID={props.user.id}
          postID={post.id}
          refetch={updateRefetch}
        />
      )
    });
    setPostList(generatedList);
  }

  useEffect(() => {
    if (refetch) {
      fetchPosts();
      setRefetch(false);
    }
  }, [refetch]); //to fix refresh issue, add posts.

  // Only generate posts when posts is changed
  useEffect(() => {
    if (posts) {
      generatePosts();
    }
  }, [posts])

  return (
    <section className='main-container'>
      <div>
        <LiveSearch />
      </div>
      <div className='create-post-container'>
        <CreatePost refetch={updateRefetch} posts={posts} setPosts={setPosts} user={props.user} />
      </div>
      <div className='feed-container'>
        {postList}
      </div>
    </section>
  );

}
 
export default GeneralFeed;