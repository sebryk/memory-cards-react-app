import React, {useState, useEffect} from 'react';
import MiniFolder from '../components/MiniFolder/MiniFolder';
import Button from '../components/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai'
import './AllFolders.css'
import Modal from '../components/Modal/Modal';



const AllFolders = ({ allFolders, setAllFolders }) => {
  // logic data to open and close modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // id edited folder
  const [idEditedFolder, setIdEditedFolder] = useState(null);
  // data of modal input
  const [modalInput, setModalInput] = useState('');
  // update local storage when allFolders state updates
  useEffect(() => {
    localStorage.setItem('allFolders', JSON.stringify(allFolders));
  }, [allFolders]);
  
  const showModal = () => {
    setIdEditedFolder(null);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalInput('')
  }

  const handleChange = e => {
    setModalInput(e.target.value)
  }

  function addFolder() {
      setAllFolders(prev => [
      ...prev, 
      {  
        id: Date.now(), 
        // limiting number of characters to 25 max and adding multiple dots
        name: modalInput.length > 25 ? `${modalInput.slice(0, 25)}...` : modalInput,
        cards: [],
      },
      ]);
      setModalInput('')
      setIsModalOpen(false)
  }
  //editing name of existing folder
  function editFolderName(){
    setAllFolders(prevFolders => prevFolders.map((folder) => {
      // if the folder id matches the id that was set in the idEditedFolder adding new name to editing folder
        if (folder.id === idEditedFolder) {
          return {
            ...folder, 
            name: modalInput.length > 25 ? `${modalInput.slice(0, 25)}...` : modalInput,
          }
        } else {
          return folder
        }
    }))
    setModalInput('')
    setIsModalOpen(false)
  }

  const deleteCard = (e, id) => {
    e.preventDefault()
    setAllFolders(prevFolders => prevFolders.filter(folder => folder.id !== id))
  }
  //invoking modal to edit folder name and adding that name in modal input 
  const editFolder = (e, id) => {
    e.preventDefault()
    setIdEditedFolder(id)
    setModalInput(e.target.closest('a').text)
    setIsModalOpen(true)
  }

  const miniFoldersElements = allFolders?.map((item, i) => {
    return  <MiniFolder 
              key={item.id} 
              id={item.id}
              link={`/${item.id}`}
              handleClickDelete={(e) => deleteCard(e, item.id)}
              handleClickEdit={(e) => editFolder(e, item.id)}
            >
              {item.name}
           </MiniFolder>
  })
  return (
    <div className="all-folders">
      <div className="all-folders__container">
        {isModalOpen ? 
          <Modal
            setIsVisible={setIsModalOpen}
            modalInput={modalInput}
            handleChange={handleChange}
            /* if id exist using edit function, otherwise add function*/
            handleFolder={idEditedFolder ? editFolderName : addFolder }
            closeModal={closeModal}
            >
            {/* if id exist naming button 'Save' in edit mode, otherwise 'Add' in add mode */}
            {idEditedFolder ? 'Save' : 'Add'} 
          </Modal> : null}
          <div className='all-folders__grid'> 
          {/* rendering folders if they exist, otherwise displaing title */}
          {allFolders.length ? (miniFoldersElements) : (<h1 className='all-folders__title'>Add Your First Folder For Memory Cards</h1>)}
          <Button 
          className="all-folders__btn"
          // style for adding button that depends of the existence of a folder
            style={{ 
              position: allFolders.length ? 'static' : 'absolute' ,
              transform: allFolders.length ? 'initial': '',
              width: allFolders.length ? '' : '52px',
              height: allFolders.length ? '' : '48px',
              display: isModalOpen ? 'none' : '', 
            }}
            onClick={showModal}
          >
          <AiOutlinePlus
            style={{minWidth:'40px', height:'40px'}}
            />
        </Button>
        </div>
      </div>
    </div>
  );
}
export default AllFolders;