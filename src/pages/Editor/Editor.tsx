import { FC, useState, useEffect, useContext, ChangeEvent } from 'react'
import './Editor.css'
import TextArea from '../../components/TextArea/TextArea'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { RxCheck, RxCross2 } from 'react-icons/rx'
import Button from '../../components/Button/Button'
import { RiTranslate } from 'react-icons/ri'
import { BsArrowRepeat } from 'react-icons/bs'
import Select from '../../components/Select/Select'
import { AllFoldersContext } from '../../context/allFoldersContext';
import { LocalStorage } from '../../utilities/LocalStorage/LocalStorage'
import { IAllFoldersContext} from '../../types/types';
import { getTranslate } from '../../api/api';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';



const Editor: FC = () =>  {

  const contextValue = useContext<IAllFoldersContext | null>(AllFoldersContext);

  if (!contextValue) {
    throw new Error('AllFoldersContext is not available.');
  }

  const { allFolders, setAllFolders } = contextValue;

  // getting params to display data from correct card 
  let { id: idPage, index: cardIndex } = useParams<{ id: string; index: string }>()

 
  const navigate = useNavigate()
  const currentFolder = allFolders.find(folder => folder.id === Number(idPage))

  const [translation, setTranslation] = useState('')
  const [error, setError] = useState('')
  // state with selected languages, if card exist and was opened to edit 
  // adding languages that was selected while saving this card
  const [selectedOption, setSelectedOption] = useState<{ input: string; output: string }>({
    input: currentFolder && cardIndex ? currentFolder.cards[Number(cardIndex)].languages.input : 'en',
    output: currentFolder && cardIndex ? currentFolder.cards[Number(cardIndex)].languages.output : 'es'
  });
  // options of select component
  const [options, setOptions] = useState ({
    input: [
      { value: 'ru', label: 'Ru' },
      { value: 'it', label: 'It' },
      { value: 'de', label: 'De' },
      { value: 'fr', label: 'Fr' },
      { value: 'es', label: 'Es' },
      { value: 'en', label: 'En' },
    ],
    output: [
      { value: 'ru', label: 'Ru' },
      { value: 'it', label: 'It' },
      { value: 'de', label: 'De' },
      { value: 'fr', label: 'Fr' },
      { value: 'en', label: 'En' },
      { value: 'es', label: 'Es' },
    ]
  })
  
  // if data of input and output exists adding it to state, otherwise empty strings
  const [memoryCard, setMemoryCard] = useState({
    id: cardIndex ? currentFolder?.cards[Number(cardIndex)].id : Date.now(),
    inputValue: cardIndex ? currentFolder?.cards[Number(cardIndex)].inputValue : '',
    outputValue: cardIndex ? currentFolder?.cards[Number(cardIndex)].outputValue : '',
    isLearned: cardIndex ? currentFolder?.cards[Number(cardIndex)].isLearned : false,
    languages: { input: '', output: '' }
  });


  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMemoryCard(prev => ({ 
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  // setting selected option corresponding to the input or output
  const handleOptionSelect = (option: string, name: string ) => {
    if (name === 'input') {
      setSelectedOption({ ...selectedOption, input: option });
    } else if (name === 'output') {
      setSelectedOption({ ...selectedOption, output: option });
    }
  };
  // every time when selected option changes update it in memory card state
  useEffect(() => {
    setMemoryCard({ ...memoryCard, languages:  selectedOption });
  },[selectedOption]);

  // fetch translated data 
  useEffect(() => {
    if(memoryCard.inputValue && selectedOption.input && selectedOption.output) { 
      getTranslate(memoryCard.inputValue, selectedOption.input, selectedOption.output, setTranslation, setError);
    }
    // getting translation after changing these values
  }, [memoryCard.inputValue, selectedOption.input, selectedOption.output]);


  function translateText() {
    setMemoryCard({
      ...memoryCard,
      outputValue: translation
    });
  }

  // changing card values when switching sides
  const swapMemoryCardValues = () => {
    setMemoryCard({ 
      ...memoryCard,
      inputValue: memoryCard.outputValue,
      outputValue: memoryCard.inputValue,
    })
  }
  // update state folder and local storage
  function updateFolder() {
    setAllFolders(prevFolders => {
      const updatedFolders = prevFolders.map(folder => {
        let updatedCards = [];
        if (folder.id === Number(idPage)) {
          if(cardIndex) {
            updatedCards = [...folder.cards];
            updatedCards[Number(cardIndex)] = memoryCard
          } else {
            updatedCards = [...folder.cards, memoryCard];
            cardIndex = String(updatedCards.length - 1)
          }
          return { ...folder, cards: updatedCards };
        }
        return folder;
      });
  
      LocalStorage.set('allFolders', updatedFolders);
  
      return updatedFolders;
    });
  
    navigate(`../${idPage}`, { state: { cardIndex } });
  
  }
  
  const isFolderIdInvalid = currentFolder?.id !== Number(idPage) 
  const isCardIdInvalid = cardIndex && currentFolder?.cards[Number(cardIndex)]?.id !== memoryCard?.id
  
  if(isFolderIdInvalid || isCardIdInvalid) {
    return <Navigate to='/not-found' replace />
  }

  return (
    <div className='editor'>
      <div className='editor__container'>
      {error && <ErrorBoundary error={error} />}
        <TextArea
          className='editor__input text-area'
          maxLength={(140)}
          onChange={handleChange}
          value={memoryCard.inputValue}
          name='inputValue'
          autoFocus={true}
        />
        <h3 className='editor__title editor__title--input'>
          Front Side
        </h3>
        <TextArea
          className='editor__output text-area'
          maxLength={140}
          onChange={handleChange}
          value={memoryCard.outputValue}
          name='outputValue'
        />
        <h3 className='editor__title editor__title--output'>
          Back Side
        </h3>
        <Button
        className='editor__link editor__link--save'
        disabled={memoryCard.inputValue || memoryCard.outputValue ? false : true}
        onClick={updateFolder}
        >
          <RxCheck
            className='editor__link-icon'
            style={{width: '45px', height: '45px'}}
          />
        </Button>
        <Button 
        className='editor__link editor__link--change'
        onClick={swapMemoryCardValues}
        >
          <BsArrowRepeat
            className='editor__link-icon'
            style={{width:'45px', height:'45px'}}
          />
        </Button>
        <Button 
        className='editor__link editor__link--cancel'
        onClick={() => navigate(`../${idPage}`, { state: { cardIndex } })}
        >
          <RxCross2
            className='editor__link-icon'
            style={{width: '40px', height: '40px'}}
          />
        </Button>
        <Button
          onClick={translateText}
          className='editor__btn'
        >
        <RiTranslate
          style={{width: '40px', height: '40px'}}
        />
        </Button>
        <Select
        options={options.input}
        setOptions={setOptions}
        selectedOption={selectedOption.input}
        handleOptionSelect={handleOptionSelect}
        name='input'
        className='select select--input'
      />
        <Select
        options={options.output}
        setOptions={setOptions}
        selectedOption={selectedOption.output}
        handleOptionSelect={handleOptionSelect}
        name='output'
        className='select select--output'
      />
      </div>
    </div>
  )
}

export default Editor