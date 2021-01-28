import React from 'react';

import StatusBadge from './StatusBadge';

const ActionButton = (props) => {
  if (props.action) {
    return (
      <a href={props.url + props.action} className="button is-primary">{props.text || 'Go'}</a>
    );
  } else {
    return '';
  }
};

const CondCol = (props) => {
  if (props.rif) {
    return (
      <td>
        {props.children}
      </td>
    );
  } else {
    return '';
  }
};

const TableCol = (props) => {
  return props.attrs.map((attr) => (
    <td>{props.data[attr]}</td>
  ));
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
        <td><span>{item.name}</span></td>
        <TableCol attrs={attrs} data={item} />
        <CondCol rif={item.status}><StatusBadge status={item.status} /></CondCol>
        <CondCol rif={props.action}><ActionButton action={props.action} text={props.actionLabel} url={`${props.prefix}/${item.uuid}`} /></CondCol>
      </tr>
    ));
  } else {
    return (<tr>Loading</tr>);
  }
};
export default TableRow;
