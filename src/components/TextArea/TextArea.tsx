import './TextArea.css'
import { ReactNode } from 'react'

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode
  maxLength?: number
}


const TextInput: React.FC<ITextAreaProps> = ({maxLength, children, ...props}) =>  {
  return (
    <textarea {...props} maxLength={maxLength}>{children}</textarea>
  )
}

export default TextInput
