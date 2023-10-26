import { Link } from 'react-router-dom';
import './MiniFolder.css'
import Button from '../Button/Button';
import { GrTrash } from 'react-icons/gr'
import { PiPencil } from 'react-icons/pi'

function MiniFolder({ children, link, handleClickDelete, handleClickEdit, id}) {
  
  return (
    <Link to={link} 
        id={id}
        className='mini-folder'>
        {children}
        <Button 
          onClick={handleClickEdit}
          className='mini-folder__btn mini-folder__btn--edit'
        >
          <PiPencil
            className='mini-folder__btn-icon '
            style={{width: '21px', height: '21px'}}
          />
        </Button>
        <Button 
          onClick={handleClickDelete}
          className='mini-folder__btn mini-folder__btn--delete'
        >
          <GrTrash
            className='mini-folder__btn-icon'
            style={{width: '17px', height: '17px'}}
          />
        </Button>
      </Link>
  );
}

export default MiniFolder

