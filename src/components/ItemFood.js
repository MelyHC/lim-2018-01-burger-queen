import React from 'react';

const ItemFood = ({ name, price, add }) => {
  return (
    <div className="card text-center m-1" onClick={() => add(name, price)}>
      <span className=""> {name}</span>
      <span className=""> s/.{price}</span>
    </div>
  );
}

export default ItemFood;