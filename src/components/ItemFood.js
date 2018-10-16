import React from 'react';

const ItemFood = ({ name, price }) => {
  return (
    <div className="card text-center m-1">
      <span className=""> {name}</span>
      <span className=""> s/.{price}</span>
    </div>
  );
}

export default ItemFood;