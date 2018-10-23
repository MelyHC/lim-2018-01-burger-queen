import React from 'react';

const AddItem = ({ name, price, count, remove }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">s/. {price}</td>
      <td className="text-center"><span className="badge badge-pill badge-primary">{count}</span></td>
      <td onClick={() => remove(name)}><i className="fas fa-trash text-danger"></i></td>
    </tr>
  )
}

export default AddItem;