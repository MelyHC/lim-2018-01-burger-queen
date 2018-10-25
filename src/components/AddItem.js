import React from 'react';

const AddItem = ({ name, price, count, remove, i, add, reduce }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">s/. {price}</td>
      <td className="text-center">
        <i className="cursor fas fa-minus mr-2 text-secondary" onClick={()=> reduce(price, name, i)}></i>
        <span className="badge badge-pill badge-primary">{count}</span>
        <i className="cursor fas fa-plus ml-2 text-secondary" onClick={()=> add(price, name)}></i>
      </td>
      <td className="cursor" onClick={() => remove(i)}><i className="fas fa-trash text-danger"></i></td>
    </tr>
  )
}

export default AddItem;