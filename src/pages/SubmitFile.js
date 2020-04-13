import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const SubmitFile = () => {
  const globals = useContext(GlobalContext);
  return (
    <div>
      <h1>Submit New File</h1>
      <span>{JSON.stringify(globals)}</span>
    </div>
  );
};

export default SubmitFile;
