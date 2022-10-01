import './Post.scss'

const Post = (props) => {

  console.log(props.content);

  return ( 
    <div className="flex mt-4 mx-4">
      <h4>Username: {props.creator}</h4>
      <p>{props.content}</p>
      <img className="img-thumbnail" src={props.image_url} alt='Post Image' />
    </div>
  );
}
 
export default Post;