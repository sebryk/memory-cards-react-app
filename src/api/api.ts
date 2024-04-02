import { debounce } from 'lodash';

export const getTranslate = debounce(async (inputValue, inputLang, outputLang, setTranslation, setError) => {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${inputValue}!&langpair=${inputLang}|${outputLang}`;
    const response = await fetch(url);
    const data = await response.json();
    setTranslation(data?.matches[0]?.translation);
    setError('');
  } catch (error) {
    console.error(error);
    setError('An error occurred while fetching the translation.');
  }
}, 300);
