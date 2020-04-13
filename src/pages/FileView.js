import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import StatusBadge from '../components/StatusBadge'

const FileView = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [media, setMedia] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/files/${props.id}`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileData = await response.json();
      setMedia(fileData);
    };
    fetchData();
  }, [globalConsumer, props.id]);

  // const statusBadge = (status) => {
  //   switch (status) {
  //     case 'Complete':
  //       return <strong className="has-background-success">{status}</strong>;
  //     case 'Cancelled':
  //     case 'Error':
  //       return <strong className="has-background-danger">{status}</strong>;
  //     case 'Loading':
  //       return <strong className="has-background-loading">{status}</strong>;
  //     case 'In Progress':
  //     default:
  //       return <strong className="has-background-warning">{status}</strong>;
  //   }
  // };
  return (
    <div>
      <h1 className="title is-1">File: {media.elementName}</h1>
      <div className="card card-content content">
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>ID</label>: <strong>{media ? media.uuid : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>File name</label>: <strong>{media ? media.elementName : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Type</label>: <strong>{media ? media.elementType : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Created</label>: <strong>{media ? media.creationDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Updated</label>: <strong>{media ? media.updatedDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Status</label>: {media ? <StatusBadge status={media.status} /> : <StatusBadge status="Loading" />}
          </p>
        </div>
      </div>
      {/* {!media ? <div className="is-loading">Loading</div> : (
        <div>
          <div className="field">
            <label className="label">Element Name</label>
            <div className="input">{media.elementName}</div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FileView;
