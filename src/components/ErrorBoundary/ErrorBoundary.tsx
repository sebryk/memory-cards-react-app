import { FC } from 'react';
import './ErrorBoundary.css'

interface IErrorProps {
  error: string
}

const Error: FC<IErrorProps> = (props) => {
  return (  
    <>
      <h2 className='error'>{props.error}</h2>
    </>
  );
}
 
export default Error;