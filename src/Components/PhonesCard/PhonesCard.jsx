import React from 'react';
import { Link } from 'react-router-dom';
import OrderModal from '../../SharedComponents/OrderModal/OrderModal';

const PhonesCard = ({card}) => {
    const {name, previous_price, price ,brand, storage , model , images , color , _id ,condition, description} = card
    return (
 
            <div className="card card-compact w-96 bg-base-100 shadow-xl text-black">
  <figure><img className='w-96 h-80 object-cover' src={images[0]} alt="mobile" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name} ({storage})</h2>
    <p>{description}</p>
    <h2 className="card-title"><span className='line-through'>${previous_price}</span>${price}</h2>
    <div className="card-actions justify-end">
      <Link to={`/category/${card.brand}/${_id}`}>
      <button className="btn btn-accent btn-outline">See Details</button>
      </Link>
    </div>
  </div>
 
</div>


    );
};

export default PhonesCard;