import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const StorageBar = ({storageView}) => {
  const {usage} = useContext(GlobalContext);
  return (
    <div>
      {storageView ? <div>
        <div className="is-flex is-justify-content-center is-align-items-center">
          <span className='level-item'>Storage:&nbsp;</span>
          <span className='level-item'><span>&nbsp;{usage.storage}</span>&nbsp;GB</span>
          { usage.storage < 1024 ? (
            <span><progress className="storage-view ml-3 mt-5S progress is-large" value={usage.storage} max="1024">100%</progress></span>
          ) : null }
          <span className="ml-3 is-size-5" >&nbsp;Unverified</span>
        </div>
      </div> :
      <div className="level">
        <span className='level-item'>Storage:&nbsp;</span>
        <span className='level-item'><span>&nbsp;{usage.storage}</span>&nbsp;GB</span>
        { usage.storage < 1024 ? (
            <span><progress className="level-item progress is-small nav-prog" value={usage.storage} max="1024">100%</progress></span>
        ) : null }
        <span className='level-item'>&nbsp;Unverified</span>
      </div>
      }
    </div>
  );
};

export default StorageBar;
