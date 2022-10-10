import {useState} from 'react';
import './ScrollButton.scss';
  
const ScrollButton = () => {
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <div>
      <div className='left-sidenav'> </div>
    <div className="scroll-btn" onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}}>
      {/* <i className="fa-solid fa-paw"></i> */}
      {/* <img
          className="scroll-img"
          src='../images/paw3.png'
          alt="scroll-to-top"
      /> */}
      <img
          className="scroll-img"
          src='../images/paw7.png'
          alt="scroll-to-top"
      />
      {/* <img
          className="scroll-img"
          src='../images/kitten.png'
          alt="scroll-to-top"
      /> */}
        {/* <img
          className="scroll-img"
          src='../images/puppy-jumping.gif'
          alt="scroll-to-top"
      /> */}
      {/* <img
          className="scroll-img"
          src='../images/cat-popcorn.gif'
          alt="scroll-to-top"
      /> */}
    </div>
    </div>
  );
}
  
export default ScrollButton;