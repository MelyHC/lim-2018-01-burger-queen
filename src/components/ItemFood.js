import React from 'react';

const ItemFood = ({ name, price, add }) => {
  return (
    <div className="card text-center m-2 col-5" onClick={() => add(name, price, name)}>
      <span className=""> {name}</span>
      <span className=""> s/.{price}</span>
    </div>
  );
}

export default ItemFood;