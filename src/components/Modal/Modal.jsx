import Button from "../Button/Button";
import Input from "../Input/Input";
import { RxCross2 } from 'react-icons/rx'
import './Modal.css'



const Modal = ({ children, modalInput, handleChange, handleFolder, closeModal }) => {

  const handleKeyDown = e => {
    if(e.key === 'Escape') {
      closeModal()
    }else if(e.key === 'Enter') {
      handleFolder()
    }
  }

  return ( 
  <div className="overlay" 
    onClick={closeModal} 
    onKeyDown={handleKeyDown}
  >
    <div className="modal" onClick={e => e.stopPropagation()}>
      <Input
        className="modal__input"
        value={modalInput}
        onChange={handleChange}
        placeholder='Folder Name'
        autoFocus
      />
      <Button
        onClick={handleFolder}
        className='modal__save-btn'
        disabled={modalInput ? false : true}
      >
        { children }
      </Button>
      <Button 
        className="modal__close-btn"
        onClick={closeModal}
      >
        <RxCross2
          style={{width:'30px', height:'30px'}}
          className='modal__close-icon'
        />
      </Button>
    </div>
  </div>
  );
}
 
export default Modal;