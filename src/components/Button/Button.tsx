import { FC, ReactNode } from 'react';
import './Button.css'

interface ButtonProps{
  children: ReactNode,
  className: string,
  disabled?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, id?: number) => void,
  style?: {
    [key: string]: string
  }
}

const Button: FC<ButtonProps> = ({ children, ...rest}) => {
  return ( 
    <button {...rest}>
      {children}
    </button>
   );
}

export default Button