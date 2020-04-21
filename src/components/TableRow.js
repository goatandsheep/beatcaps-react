import React from 'react';

import StatusBadge from './StatusBadge';

const TableRow = (props) => {
  if (props.data) {
    return props.data.map((item) => (
      <tr>
        <td><a href={`/file/${item.uuid}`}>{item.uuid}</a></td>
        <td>{item.elementName}</td>
        <td>{item.elementType}</td>
        <td>{item.creationDate}</td>
        <td>{item.updatedDate}</td>
        <td><StatusBadge status={item.status} /></td>
      </tr>
    ));
  } else {
    return (<tr>Loading</tr>);
  }
};
export default TableRow;
