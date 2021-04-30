import React from 'react';
import {Link} from 'react-router-dom';

import StatusBadge from './StatusBadge';

const ActionButton = (props) => {
  if (props.action) {
    return (
      <Link to={props.url + props.action} className="button is-primary">{props.text || 'Go'}</Link>
    );
  } else {
    return <></>;
  }
};

const CondCol = (props) => {
  if (props.rif) {
    return (
      <td>{props.children}</td>
    );
  } else {
    return <td></td>;
  }
};

const TableCol = (props) => {
  return props.attrs.map((attr) => (
    <td key={`table-col-${attr}`}>{props.data[attr]}</td>
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
      <tr key={`table-row-${item.id}`}>
        <td><a href={`${props.prefix}/${item.id}`}>{item.id}</a></td>
        <TableCol attrs={attrs} data={item} />
        <CondCol rif={item.status}><StatusBadge status={item.status} /></CondCol>
        <CondCol rif={props.action}><ActionButton action={props.action} text={props.actionLabel} url={`${props.prefix}/${item.id}`} /></CondCol>
      </tr>
    ));
  } else {
    return (<tr><th>Loading</th></tr>);
  }
};
export default TableRow;
