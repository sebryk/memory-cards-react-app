import { ChangeEvent, FC, ReactNode, KeyboardEvent } from 'react';
import Button from "../Button/Button";
import Input from "../Input/Input";
import { RxCross2 } from 'react-icons/rx'
import './Modal.css'

interface IModalProps {
  children: ReactNode
  modalInput: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleFolder: () => void
  closeModal: () => void
}

const Modal: FC<IModalProps> = ({ children, modalInput, handleChange, handleFolder, closeModal }) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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
        placeholder='Enter Folder Name'
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