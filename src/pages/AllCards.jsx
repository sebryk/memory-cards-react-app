import React from 'react';
import './AllCards.css'
import { Link } from 'react-router-dom';

function AllCards() {
  return (
    <div className="card">
      <Link to='cards'>Cards</Link>
      <div className='card__body'></div>
    </div>
  );
}
export default AllCards;