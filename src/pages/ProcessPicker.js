// import React, {useContext, useEffect, useState} from 'react';
// import {GlobalContext} from '../contexts/GlobalState';
import {Link} from 'react-router-dom';
// import constants from '../constants';

const ProcessPicker = () => {
  // const globalConsumer = useContext(GlobalContext);

  return (
    <div>
      <h1 className="title is-1">Video Processing Selection</h1>
      <p className="is-size-5 has-text-black is-block mb-3">
            How would you like to process this video?
      </p>
      <div className="level has-background-info-light" >
        <div className="level-item is-flex-direction-column my-5">
          <Link to="/file/use" className="button is-primary is-medium">Beatcaps</Link>
        </div>
        <div className="level-item is-flex-direction-column my-5">
          <Link to="/templates" className="button is-warning is-medium">Overleia</Link>
        </div>
      </div>
    </div>
  );
};

export default ProcessPicker;
