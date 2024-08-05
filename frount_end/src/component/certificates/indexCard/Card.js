import React from 'react';
import { Link } from 'react-router-dom';
import Data from './Data.json';
import './Card.css'; // Import the CSS file

export default function Card() {
  return (
    <div className="cards-container">
      {Data.map((data) => (
        <div className="card" key={data.id}> {/* Make sure each card has a unique key */}
          <img src={data.img} className="card-img-top" alt={data.title} />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.des}</p>
          </div>
          <div className="ti ">
            <Link to={data.link} className="btn btn-primary ti">Click Me</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
