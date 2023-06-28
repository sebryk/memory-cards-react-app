import React from 'react'
import './TextOutput.css'

function TextOutput(props) {
  return (
    <textarea 
    className='text-output'
    value={props.outputValue} 
    onChange={props.handleChange}
    >
      {props.outputValue}
    </textarea>
  )
}

export default TextOutput