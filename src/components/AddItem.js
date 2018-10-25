import React from 'react';

const AddItem = ({ name, price, count, remove, i }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">s/. {price}</td>
      <td className="text-center">
        <span className="btn ">-</span>
        <span className="badge badge-pill badge-primary">{count}</span>
        <span className="btn ">+</span>
      </td>
      <td className="btn" onClick={() => remove(i)}><i className="fas fa-trash text-danger"></i></td>
    </tr>
  )
}

export default AddItem;