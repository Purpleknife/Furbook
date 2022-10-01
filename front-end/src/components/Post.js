import './Post.scss'

const Post = (props) => {

  

  return ( 
    <div className="mt-4 mx-4">
      <h4>Username: {props.creator}</h4>
      <p>{props.content}</p>
      <img className="img-thumbnail" src={props.image_url} alt='Post Image' />
      <p>Likes</p>
      <p>Comments</p>
    </div>
  );
}
 
export default Post;