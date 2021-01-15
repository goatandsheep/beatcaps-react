import React from 'react';

import StatusBadge from './StatusBadge';

const TableCol = (props) => {
  return props.attrs.map((attr) => (
    <td>{props.data[attr]}</td>
  ))
};

const TableRow = (props) => {
  let attrs = [];
  if (props.attrs) {
    attrs = props.attrs;
  } else {
    attrs = ['elementName', 'elementType', 'creationDate', 'updatedDate'];
  }
  if (props.data) {
    return props.data.map((item) => (
      <tr>
        <td><a href={`${props.prefix}/${item.uuid}`}>{item.uuid}</a></td>
        <TableCol attrs={attrs} data={item} />
        <td><StatusBadge status={item.status} /></td>
      </tr>
    ));
  } else {
    return (<tr>Loading</tr>);
  }
};
export default TableRow;
