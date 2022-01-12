import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import StorageBar from '../components/StorageBar';

const StorageView = (props) => {
  const globalConsumer = useContext(GlobalContext);
  const [storageDataAmount, setStorageDataAmount] = useState(0);
  const [minDataAmount, setMinDataAmount] = useState(0);
  const [upgraded, setUpgraded] = useState(false);
  const [freeTrial, setFreeTrial] = useState(true);

  const {search} = useLocation();

  console.log('u', globalConsumer.user);

  useEffect(() => {
    const query = queryString.parse(search);
    if (query.session_id) {
      console.log('query', query);
      fetch(`${constants.SERVER_DOMAIN}/usage`, {
        method: 'PATCH',
        body: JSON.stringify(query),
        headers: {
          'Authorization': globalConsumer.token,
          'Content-Type': 'application/json',
          'X-Auth-Token': globalConsumer.user.identityId,
        },
      });
    }
  });

  const handleUpgrade = async () => {
    // https://stripe.com/docs/api/checkout/sessions/create
    try {
      const response = await fetch(`${constants.SERVER_DOMAIN}/usage`, {
        method: 'PUT',
        headers: {
          'Authorization': globalConsumer.token,
          'Content-Type': 'application/json',
          'X-Auth-Token': globalConsumer.user.identityId,
        },
      });
      window.location.href = (await response.json()).url;
    } catch (err) {
      //
    }
  };


  // TODO: get query string
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
      setUpgraded(response.verified);
      // setFreeTrial(response.trialVerified)
      setFreeTrial(response.trialVerified);
      setStorageDataAmount(response.storageUsage);
      setMinDataAmount(response.beatcapsUsage);
      // const response = await fetch(`${constants.SERVER_DOMAIN}/usage`)
    } catch (err) {
      //
    }
  };

  return (
    <div>
      <h1 className="title is-1">Storage Info</h1>
      {upgraded ?
      <div >
        <p className="is-size-3">Thank you for Upgrading!</p>
        <br/>
        <p>Storage Usage: {storageDataAmount} kB</p>
        <p>Beatcaps Usage: {minDataAmount} seconds</p>
        <button onClick={fetchData}>FetchData</button>
      </div> :
      (freeTrial ?
      <div>
        <StorageBar storageView={true}/>
        <p>After the initial 1GB free storage, future GB of data cost $8 per GB. <br/> This includes upload and proccessed content.</p>
        <p>Click below to upgrade for more storage.</p>
        <button onClick={handleUpgrade} className="button is-primary is-medium mt-5">Upgrade Now</button>
      </div> :
      <div>
        <div>
          <p className="is-size-3">Upgrade Now for More Storage!</p>
          <p>Future GB of data cost $8 per GB. <br/> This includes upload and proccessed content.</p>
          <p>Click below to upgrade for more storage.</p>
          <button onClick={handleUpgrade} className="button is-primary is-medium mt-5">Upgrade Now</button>
        </div>
      </div>)}
    </div>
  );
};

export default StorageView;
