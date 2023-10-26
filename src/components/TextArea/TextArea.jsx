import './TextArea.css'

export default function TextInput({children, ...props}) {
  return (
    <textarea {...props}>{children}</textarea>
  )
}
