import React from 'react';
import {Link} from 'react-router-dom';


const StorageView = () => {
  return (
    <div>
      <h1 className="title is-1">Storage Info</h1>
      <div>
        <p className="is-size-3">Free Storage:</p>
        <div className="is-flex is-justify-content-center is-align-items-center">
          <progress class="storage-view ml-3 mt-5 progress is-large" value="10" max="100">100%</progress>
          <span className="ml-3 is-size-5" >0.1GB</span>
        </div>
      </div>
      <p>After the initial 1GB free storage, future GB of data cost $8 per GB. <br/> This includes upload and proccessed content.</p>
      <p>Click below to upgrade for more storage.</p>
      <Link to="/" className="button is-primary is-medium mt-5">Upgrade Now</Link>
    </div>
  );
};

export default StorageView;
