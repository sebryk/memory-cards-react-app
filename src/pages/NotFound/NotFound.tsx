import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
  return (  
    <div className="not-found">
      <div className='not-found__container'>
        <h1 className='not-found__title'>The page you've been looking for doesn't exist</h1> 
        <p className='not-found__text'>Back to  <Link className='not-found__link' to={'/'}>Folders</Link></p>
      </div>
    </div>
  );
}
 
export default NotFound;