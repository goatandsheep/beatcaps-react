import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const StorageBar = () => {
  const {usage} = useContext(GlobalContext);
  return (
    <div className="level">
      <span className='level-item'>Storage:&nbsp;</span>
      <span className='level-item'><span>&nbsp;{usage.storage}</span>&nbsp;GB</span>
      { usage.storage < 1024 ? (
          <span><progress className="level-item progress is-small nav-prog" value={usage.storage} max="1024">100%</progress></span>
      ) : null }
      <span className='level-item'>&nbsp;Unverified</span>
    </div>
  );
};

export default StorageBar;
