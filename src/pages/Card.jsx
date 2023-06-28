import React from 'react';
import './Card.css'
import { Link } from 'react-router-dom';

function Card() {
  return (
    <div className="card">
          <Link to='..'>To All Cards</Link>
          <Link to='translator'>Edit</Link>
          <div className='card__body'></div>
    </div>
  );
}

export default Card;