import './Card.css'
import { FC, ReactNode } from 'react';

interface ICardProps {
  children: ReactNode
}

const Card: FC<ICardProps> = ({ children, ...props }) => {
  return ( 
    <div 
    className="card"
    {...props}
    >
    {children}
    </div>
  );
}

export default Card;