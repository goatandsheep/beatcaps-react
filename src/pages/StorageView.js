import React, {useContext} from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';


const StorageView = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const {search} = useLocation();
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

  return (
    <div>
      <h1 className="title is-1">Storage Info</h1>
      <div>
        <p className="is-size-3">Free Storage:</p>
        <div className="is-flex is-justify-content-center is-align-items-center">
          <progress className="storage-view ml-3 mt-5 progress is-large" value="10" max="100">100%</progress>
          <span className="ml-3 is-size-5" >0.1GB</span>
        </div>
      </div>
      <p>After the initial 1GB free storage, future GB of data cost $8 per GB. <br/> This includes upload and proccessed content.</p>
      <p>Click below to upgrade for more storage.</p>
      <button onClick={handleUpgrade} className="button is-primary is-medium mt-5">Upgrade Now</button>
    </div>
  );
};

export default StorageView;
