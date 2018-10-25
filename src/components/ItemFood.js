import React from 'react';

const ItemFood = ({ name, price, add }) => {
  return (
    <div className="card text-center m-2 col-5 cursor p-2" onClick={() => add(name, price, name)}>
      <span> {name}</span>
      <span> s/.{price}</span>
    </div>
  );
}

export default ItemFood;