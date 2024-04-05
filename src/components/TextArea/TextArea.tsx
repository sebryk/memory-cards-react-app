import { FC, TextareaHTMLAttributes } from 'react'
import './TextArea.css'
import { ReactNode } from 'react'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode
  maxLength?: number
}


const TextInput: FC<ITextAreaProps> = ({maxLength, children, ...props}) =>  {
  return (
    <textarea {...props} maxLength={maxLength}>{children}</textarea>
  )
}

export default TextInput
