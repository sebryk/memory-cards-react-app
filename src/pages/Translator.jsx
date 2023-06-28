import { useState, useEffect } from 'react'
import './Translator.css'
import TextInput from '.././components/TextInput/TextInput'
import TextOutput from '.././components/TextOutput/TextOutput'
import { Link } from 'react-router-dom'

function Translator() {
  const [inputValue, setInputValue] = useState('')
  const [translation, setTranslation] = useState([])
  
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${inputValue}!&langpair=en|ru`
        const response = await fetch(url);
        const data = await response.json();
        setTranslation(data.matches[0].translation)
      } catch (error) {
        console.error(error);
      }
    }
      fetchData();

  }, [inputValue]);

  console.log(translation);

  return (
    <div className='container'>
      <TextInput
      handleChange={handleChange}
      inputValue={inputValue}/>
      <TextOutput
      outputValue={inputValue ? translation : ""}
      />
      <Link to='/cards'>Back</Link>
    </div>
  )
}

export default Translator