import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import {Storage} from '@aws-amplify/storage';

const BeatCapsInputs = () => (
  <>
    <div className="field">
      <label className="label" htmlFor="typeInput">Media Type</label>
      <div className="control has-icons-left">
        <span className="select">
          <select id="typeInput" className="input" name="typeInput" required>
            <option value="video" defaultValue>Video</option>
            <option value="audio">Audio</option>
          </select>
        </span>
        <span className="icon is-small is-left">
          <i className="fas fa-film"></i>
        </span>
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="typeOutput">Caption Format</label>
      <div className="control has-icons-left">
        <span className="select">
          <select id="typeOutput" className="input" name="typeOutput" required>
            <option value="webvtt" defaultValue>WebVTT</option>
            <option value="srt">SRT</option>
          </select>
        </span>
        <span className="icon is-small is-left">
          <i className="fas fa-closed-captioning"></i>
        </span>
      </div>
    </div>
  </>
);

const SubmitFile = () => {
  const [loading, setLoading] = useState(false);
  const globalConsumer = useContext(GlobalContext);

  const [misc, setMisc] = useState('');
  const chooseFile = async () => {
    const fileEl = document.querySelector('#inputFile').files[0];
    setMisc({name: fileEl.name, file: fileEl});
  };
  const handleFileSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const file = misc.file;
    const metadata = Object.fromEntries((new FormData(event.target)).entries());
    delete metadata.files;
    metadata.userId = globalConsumer.user.identityId;
    metadata.file = misc.name;
    const awsResp = await Storage.put(file.name, file, {
      level: 'private',
      metadata,
    });
    const resp = await uploadFile(metadata);
    if (resp && awsResp && awsResp.key) {
      window.location.href = `/`;
    } else {
      setLoading(false);
      throw new Error('file upload error');
    }
  };
  const uploadFile = async (req) => {
    try {
      if (globalConsumer.token) {
        const response = await fetch(`${constants.SERVER_DOMAIN}/file`, {
          method: 'POST',
          body: JSON.stringify(req),
          headers: {
            'Authorization': globalConsumer.token,
            'Content-Type': 'application/json',
            'X-Auth-Token': globalConsumer.user.identityId,
          },
        });
        return await response.json();
      }
    } catch (err) {
      console.error('request failure', err);
      throw err;
    }
  };
  return (
    <div>
      <h1 className="title is-1">Submit New File</h1>
      <form className="card" onSubmit={handleFileSubmit} method="post" >
        <fieldset className="card-content content">
          <legend className="subtitle is-6">Enter file information</legend>
          {constants.SHOW_BEATCAPS && <BeatCapsInputs/>}
          <div className="file has-name">
            <label className="file-label" htmlFor="inputFile">
              <input className="file-input" accept=".mp3,.mp4,.png,.jpeg,.jpg" id="inputFile" type="file" onChange={chooseFile} required/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file</span>
              </span>
              <span className="file-name">{misc.name}</span>
            </label>
          </div>
        </fieldset>
        <button disabled={loading} className="button is-primary" type="submit">{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default SubmitFile;
