import { useState, useRef, useEffect, FC, RefObject, Dispatch, SetStateAction } from 'react'
import { VscTriangleDown } from 'react-icons/vsc'
import './Select.css'

interface ISelectProps {
  options: {
    value: string;
    label: string;
  }[]
  setOptions: Dispatch<SetStateAction<IOptions>>;
  selectedOption: string
  handleOptionSelect: (value: string, name: string) => void
  className?: string
  name: string
}

interface IOptions{
    input: {
      value: string;
      label: string;
  }[];
  output: {
      value: string;
      label: string;
  }[];
}

const Select: FC<ISelectProps> = ({ options, setOptions, selectedOption, handleOptionSelect, className, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const selectRef: RefObject<HTMLDivElement> = useRef(null);
  // open dropdown menu
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  //changing the order tn the array so that the selected element is moved to the beginning 
  const rearangeOptions = (value: string , name: string) => {
    const indexOfselectedOption = options.findIndex(el => el.value === value)
    const newArray = options.slice()
    const selectedOption = newArray.splice(indexOfselectedOption, 1)
    newArray.push(...selectedOption)
    setOptions(prev => ({...prev, [name]: newArray}))
  } 
  // select one of the dropdown options
  const handleOptionClick = (value: string, name: string) => {
    handleOptionSelect(value, name);
    toggleSelect();
    rearangeOptions(value, name)
  };

  const handleOptionHover = (value: string | null) => {
    setIsHovering(value);
  };

  // closing select dropdown menu after clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div ref={selectRef} className={className}>
      <div className="select__input" onClick={toggleSelect}>
        {`${selectedOption[0].toUpperCase()}${selectedOption.slice(1)}`}
        <VscTriangleDown
          className='select__icon'
        />
      </div>
      {isOpen && (
        <ul className="select__options">
          {options
          .map(option => (
            <li
              className={`select__options-item ${
                selectedOption === option.value ? 'select__options-item--selected' : '' ||
                isHovering === option.value ? 'select__options-item--hovered' : ''
              }`}
              key={option.value}
              onClick={() => handleOptionClick(option.value, name)}
              onMouseEnter={() => handleOptionHover(option.value)}
              onMouseLeave={() => handleOptionHover(null)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 
export default Select;