import { useState, useEffect } from 'react'
import './Editor.css'
import TextArea from '../components/TextArea/TextArea'
import { useNavigate, useParams } from 'react-router-dom'
import { RxCheck, RxCross2, RxWidth} from 'react-icons/rx'
import Button from '../components/Button/Button'
import { RiTranslate } from 'react-icons/ri'
import { BsArrowRepeat } from 'react-icons/bs'
import Select from '../components/Select/Select'
import { debounce } from 'lodash';


function Editor({ allFolders, setAllFolders }) {
  // getting params to display data from correct card 
  const {id: idPage, index: cardIndex} = useParams()
  const navigate = useNavigate()
  const currentFolder = allFolders.find(folder => folder.id === Number(idPage))
  const [translation, setTranslation] = useState('')
  // state with selected languages, if card exist and was opened to edit 
  // adding languages that was selected while saving this card
  const [selectedOption, setSelectedOption] = useState({
    input: cardIndex ? currentFolder.cards[cardIndex].languages.input : 'en',
    output: cardIndex ? currentFolder.cards[cardIndex].languages.output : 'es'
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
    inputValue: cardIndex ? currentFolder.cards[cardIndex].inputValue : '',
    outputValue: cardIndex ? currentFolder.cards[cardIndex].outputValue : '',
  });

  function handleChange(e) {
    setMemoryCard(prev => ({ 
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // setting selected option corresponding to the input or output
  const handleOptionSelect = (option, name) => {
    if (name === 'input') {
      setSelectedOption({ ...selectedOption, input: option });
    } else if (name === 'output') {
      setSelectedOption({ ...selectedOption, output: option });
    }
  };
  // every time when selected option changes update it in memory card state
  useEffect(() => {
    setMemoryCard({ ...memoryCard, languages: selectedOption });
  },[selectedOption]);

  // fetch translated data 
  useEffect(() => {
    const getTranslate = debounce(async () => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${memoryCard.inputValue}!&langpair=${selectedOption.input}|${selectedOption.output}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setTranslation(data?.matches[0]?.translation)
      } catch (error) {
        console.error(error);
      }
    }, 300)
      getTranslate();
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
            updatedCards[cardIndex] = memoryCard
          } else {
            updatedCards = [...folder.cards, memoryCard];
          }
          return { ...folder, cards: updatedCards };
        }
        return folder;
      });
  
      localStorage.setItem('allFolders', JSON.stringify(updatedFolders));
  
      return updatedFolders;
    });
  
    return navigate(`../${idPage}`, { state: { cardIndex } });
  
  }
  

  return (
    <div className='editor'>
      <div className='editor__container'>
        <TextArea
          className='editor__input text-area'
          maxLength={140}
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