import './Post.scss'

const Post = (props) => {

  console.log("Post props:", props)

  return ( 
    <div className="post-body">
      <div className='post-title'>
        <img src={props.creator_image} alt='Creators profile' />
        <h4>Username: {props.creator_name}</h4>
      </div>
      <p>{props.content}</p>
      <img className="" src={props.image_url} alt='Pic' />
      <div className='post-like-comment'>
        <p>Likes</p>
        <p>Comments</p>
      </div>
      <div className='post-footer'>
        {/* Comments will go here. Needs logged in users img and a textarea */}
      </div>
    </div>
  );
}
 
export default Post;