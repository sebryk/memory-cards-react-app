import React, {useState} from 'react'
import './TextInput.css'


export default function TextInput(props) {
  

  return (
    <textarea 
    className='text-input'
    value={props.inputValue} 
    onChange={props.handleChange}

    >
      TextInput
    </textarea>
  )
}
