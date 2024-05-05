import { useEffect, useContext, useReducer, FC, MouseEvent, ChangeEvent } from 'react';
import MiniFolder from '../../components/MiniFolder/MiniFolder';
import Button from '../../components/Button/Button';
import { AiOutlinePlus } from 'react-icons/ai'
import './AllFolders.css'
import Modal from '../../components/Modal/Modal';
import { AllFoldersContext } from '../../context/allFoldersContext';
import { IAllFoldersContext } from '../../types/types'; 
import { LocalStorage } from '../../utilities/LocalStorage/LocalStorage';
import modalReducer from '../../reducers/modalReducer';
import limitingEcxessiveChars from '../../utilities/LocalStorage/limitingEcxessiveChars';


const AllFolders: FC = () => {

  const contextValue = useContext<IAllFoldersContext | null>(AllFoldersContext);

  if (!contextValue) {
    throw new Error('AllFoldersContext is not available.');
  }

  const { allFolders, setAllFolders } = contextValue;


  const [modalState, dispatch] = useReducer(modalReducer, {
    isModalOpen: false,
    idEditedFolder: null,
    modalInput: '',
  });               
  
  useEffect(() => {
    LocalStorage.set('allFolders', allFolders);
  }, [allFolders]);


  const showModal = () => {
    dispatch({type: 'showModal'})
  }

  const closeModal = () => {
    dispatch({type: 'closeModal'})
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'handleChange', payload: e.target.value})
  }


  const addFolder = () =>  {
      setAllFolders(prev => [
      ...prev, 
        {  
          id: Date.now(), 
          // limiting number of characters to 25 max and adding multiple dots
          name: modalState.modalInput,
          cards: [],
        },
      ]);
      closeModal()
  }
  //editing name of existing folder
  const editFolderName = () => {
    setAllFolders(prevFolders => prevFolders.map((folder) => {
      // if the folder id matches the id that was set in the idEditedFolder adding new name to editing folder
        if (folder.id === modalState.idEditedFolder) {
          return {
            ...folder, 
            name: modalState.modalInput,
          }
        } else {
          return folder
        }
    }))
    closeModal()

  }


  const deleteFolder = (e?: MouseEvent<HTMLButtonElement>, id?: number) => {
    e?.preventDefault()
    setAllFolders(prevFolders => prevFolders.filter(folder => folder.id !== id))
  }
  //invoking modal to edit folder name and adding that name in modal input 
  const editFolder = (e: MouseEvent<HTMLButtonElement>, id: number ) => {
    const editedFolderName = allFolders.find(folder => folder.id === id)?.name;
    e?.preventDefault()
    dispatch({type: 'setIdEditedFolder', payload: id})
    dispatch({type: 'handleChange', payload: editedFolderName ?? ''})
    dispatch({type: 'showModal'})
  }

  const miniFoldersElements = allFolders?.map((item) => {
    return  <MiniFolder 
              key={item.id} 
              id={item.id}
              link={`/${item.id}`}
              handleClickDelete={(e) => deleteFolder(e, item.id)}
              handleClickEdit={(e) => editFolder(e, item.id)}
            >
              {limitingEcxessiveChars(item.name, 25, '...')}
           </MiniFolder>
  })

  return (
    <div className="all-folders">
      <div className="all-folders__container">
        {modalState.isModalOpen ? 
          <Modal
            modalInput={modalState.modalInput}
            handleChange={handleChange}
            /* if id exist using edit function, otherwise add function*/
            handleFolder={modalState.idEditedFolder ? editFolderName : addFolder }
            closeModal={closeModal}
          >
            {/* if id exist naming button 'Save' in edit mode, otherwise 'Add' in add mode */}
            {modalState.idEditedFolder ? 'Save' : 'Add'} 
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
              display: modalState.isModalOpen ? 'none' : '', 
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