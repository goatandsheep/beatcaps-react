import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import StatusBadge from '../components/StatusBadge';
import {Storage} from '@aws-amplify/storage';

const ProgressBar = (props) => {
  if (props.status && props.status === 'In Progress' && props.progress) {
    return (<span>{props.progress}%<progress className="progress is-primary" value={props.progress} max="100">{props.progress}%</progress></span>);
  } else if (props.status && props.status === 'In Progress') {
    return (<progress className="progress" max="100">Loading</progress>);
  } else if (props.status && props.status === 'Complete') {
    return (<span>Complete</span>);
  } else {
    return (<span>N/A</span>);
  }
};

const DownloadButton = (props) => {
  return (
    <div className="column">
      <a className="button is-success is-rounded" href={props.href} target="_blank" rel="noreferrer" >
        <span className="icon">
          <i className="fas fa-download"></i>
        </span>
        <span>Download</span>
      </a>
    </div>
  );
};

const FileView = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [media, setMedia] = useState('');
  const [downloading, setDownloading] = useState('');
  // const [jobProgress, setJobProgress] = useState(0);

  const downloadFile = async (input) => {
    return Storage.get(input, {
      level: 'private',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.SERVER_DOMAIN}/jobs/${props.match.params.id}`, {
          headers: {
            'Authorization': globalConsumer.token,
            'X-Auth-Token': globalConsumer.user.identityId,
          },
        });

        const fileData = await response.json();
        setMedia(fileData);
        // setJobProgress(fileData.progress);

        // console.log(fileData.progress)
        if (fileData.status === 'Complete') {
          const signedUrl = await downloadFile(fileData.name + '.mp4');
          setDownloading(signedUrl);
        }
      } catch (e) {
        console.log(e);
      }
    };
    // Jessa's insert
    let intervalId = 0;
    const interval = 1000;
    const polling = () => {
      if (media.status === 'In Progress' && !downloading) {
        fetchData();
      } else {
        clearInterval(intervalId);
      }
    };

    if (globalConsumer.token) {
      fetchData();
      intervalId = setInterval(polling, interval);
    }
  }, [globalConsumer.user, globalConsumer.token, props.match.params.id, media.status, downloading]);

  return (
    <div>
      <h1 className="title is-2">Output File Details</h1>
      <div className="card card-content content columns is-vcentered">
        <div className="column">
          <div>
            <p className="subtitle is-5 has-text-left">
              <label>ID</label>: <strong>{media ? media.id : <span className="is-loading">Loading</span>}</strong>
            </p>
          </div>
          <div>
            <p className="subtitle is-5 has-text-left">
              <label>File name</label>: <strong>{media ? media.name : <span className="is-loading">Loading</span>}</strong>
            </p>
          </div>
          <div>
            <p className="subtitle is-5 has-text-left">
              <label>Type</label>: <strong>{media ? media.type : <span className="is-loading">Loading</span>}</strong>
            </p>
          </div>
          <div>
            <p className="subtitle is-5 has-text-left">
              <label>Progress</label>: <ProgressBar progress={media.progress} status={media.status} />
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
        {media.status === 'Complete' ? <DownloadButton href={downloading} /> : null}
      </div>
    </div>
  );
};

export default FileView;
