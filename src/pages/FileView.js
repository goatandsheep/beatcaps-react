import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import StatusBadge from '../components/StatusBadge';

const FileView = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [media, setMedia] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!globalConsumer.token) {
        throw new Error('Auth token missing');
      }

      const response = await fetch(`${constants.SERVER_DOMAIN}/jobs/${props.match.params.id}`, {
        headers: {
          Authorization: globalConsumer.token,
        },
      });
      const fileData = await response.json();
      setMedia(fileData);
    };
    fetchData();
  }, [globalConsumer.token, props.match.params.id]);

  return (
    <div>
      <h1 className="title is-2">Output File Details</h1>
      <div className="card card-content content">
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>ID</label>: <strong>{media ? media.uuid : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>File name</label>: <strong>{media ? media.elementName : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>Type</label>: <strong>{media ? media.elementType : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>Created</label>: <strong>{media ? media.creationDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>Updated</label>: <strong>{media ? media.updatedDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p className="subtitle is-5 has-text-left">
            <label>Status</label>: {media ? <StatusBadge status={media.status} /> : <StatusBadge status="Loading" />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileView;
