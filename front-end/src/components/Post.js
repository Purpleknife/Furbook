import './Post.scss'

const Post = (props) => {

  // console.log("Post props:", props)

  return ( 
    <div className="post-body">
      <div className='post-title'>
        <img src={props.creator_image} alt='Creators profile' />
        <h4>{props.creator_name}</h4>
      </div>
      <p className='post-text'>{props.content}</p>
      <img className="post-image" src={props.image_url} alt='Pic' />
      <div className='post-like-comment'>
        <i className="fa-solid fa-paw"></i>
        <i className="fa-solid fa-comments"></i>
      </div>
      <div className='post-footer'>
        {/* Comments will go here. Needs logged in users img and a textarea */}
        {/* User pic
        <input placeholder='Write a comment...' /> */}
      </div>
    </div>
  );
}
 
export default Post;