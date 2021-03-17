import React from 'react';

const StatusBadge = (props) => {
  switch (props.status) {
    case 'Complete':
      return <strong className="has-background-success">{props.status}</strong>;
    case 'Cancelled':
    case 'Error':
      return <strong className="has-background-danger">{props.status}</strong>;
    case null:
      return '';
    case 'Loading':
      return <strong className="has-background-loading">{props.status}</strong>;
    case 'In Progress':
    default:
      return <strong className="has-background-warning">{props.status}</strong>;
  }
};

export default StatusBadge;
