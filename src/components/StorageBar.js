import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const StorageBar = ({isLarge}) => {
  const globalConsumer = useContext(GlobalContext);
  // TODO: get query string
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for storage data amount, and minute data amount
        // if there is a subID and CustomerID then
        let response = await fetch(`${constants.SERVER_DOMAIN}/usage`, {
          method: 'GET',
          headers: {
            'Authorization': globalConsumer.token,
            'Content-Type': 'application/json',
            'X-Auth-Token': globalConsumer.user.identityId,
          },
        });
        response = await response.json();
        // setUpgraded(response.verified);
        // setStorageDataAmount(response.storageUsage);
        // setMinDataAmount(response.beatcapsUsage);
        if (response.usage) {
          console.log('loggy', response);
          globalConsumer.setUsage({
            storage: response.storageUsage,
            beatcaps: response.beatcapsUsage,
            verified: response.verified,
          });
        }
        // const response = await fetch(`${constants.SERVER_DOMAIN}/usage`)
      } catch (err) {
        //
      }
    };
    if (typeof globalConsumer.usage.storage === 'undefined') {
      fetchData();
    }
  }, [globalConsumer]);
  return (
    <div>
      {isLarge ? <div>
        <div className="is-flex is-justify-content-center is-align-items-center">
          <span className="ml-3 is-size-5">Storage:&nbsp;</span>
          <span className="ml-3 is-size-5"><span>&nbsp;{globalConsumer.usage.storage}</span>&nbsp;GB&nbsp;</span>
          { globalConsumer.usage.storage < 1 ? (
            <span><progress className="storage-view ml-3 mt-5S progress is-large" value={globalConsumer.usage.storage} max="1">100%</progress></span>
          ) : <span className="tag is-danger">No Space</span> }
          { globalConsumer.usage.verified ? (
            <span className="ml-3 is-size-5">&nbsp;Free Tier</span>
          ) : (
            <span className="ml-3 is-size-5">&nbsp;Unverified</span>
          )}
        </div>
      </div> :
      <div className="level">
        {/* <span className="level-item">Storage:&nbsp;</span> */}
        <span className="level-item"><span>&nbsp;{globalConsumer.usage.storage}</span>&nbsp;GB&nbsp;</span>
        { globalConsumer.usage.storage < 1 ? (
            <span><progress className="level-item progress is-small nav-prog" value={globalConsumer.usage.storage} max="1">100%</progress></span>
        ) : <span className="tag is-danger">No Space<span>{globalConsumer.usage.storage}</span></span> }
        { globalConsumer.usage.verified ? (
          <span className="level-item">&nbsp;Free Tier</span>
        ) : (
          <span className="level-item">&nbsp;Unverified </span>
        )}
      </div>
      }
    </div>
  );
};

export default StorageBar;
