import React, {useContext} from 'react';
// import {GlobalContext} from '../contexts/GlobalState';

const FileView = (props) => {
  return (
    <div>
      <h1>File View</h1>
      <span>File: {props.id}</span>
    </div>
  );
};

export default FileView;
