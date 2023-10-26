import React, { useState, useRef, useEffect } from 'react'
import { VscTriangleDown } from 'react-icons/vsc'
import './Select.css'


function Select({ options, setOptions, selectedOption, handleOptionSelect, className, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const selectRef = useRef(null);
  // open dropdown menu
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  //changing the order tn the array so that the selected element is moved to the beginning 
  const rearangeOptions = (value, name) => {
    const indexOfselectedOption = options.findIndex(el => el.value === value)
    const newArray = options.slice()
    const selectedOption = newArray.splice(indexOfselectedOption, 1)
    console.log(newArray);
    newArray.push(...selectedOption)
    setOptions(prev => ({...prev, [name]: newArray}))
  } 
  // select one of the dropdown options
  const handleOptionClick = (value, name) => {
    handleOptionSelect(value, name);
    toggleSelect();
    rearangeOptions(value, name)
  };

  const handleOptionHover = (value) => {
    setIsHovering(value);
  };

  // closing select dropdown menu after clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
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
          .map((option, i, arr) => (
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