import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import {Storage} from '@aws-amplify/storage';

const SubmitFile = () => {
  const globalConsumer = useContext(GlobalContext);

  const [misc, setMisc] = useState('');
  const chooseFile = async () => {
    const fileEl = document.querySelector('#inputFile').files[0];
    setMisc({name: fileEl.name, file: fileEl});
  };
  const handleFileSubmit = async (event) => {
    event.preventDefault();
    const file = misc.file;
    const metadata = Object.fromEntries((new FormData(event.target)).entries());
    delete metadata.files;
    metadata.userId = globalConsumer.user.identityId;
    metadata.file = misc.name;
    const resp = await uploadFile(metadata);
    const awsResp = await Storage.put(file.name, file, {
      level: 'private',
      metadata,
    });
    if (resp && awsResp && awsResp.key) {
      window.location.href = `/`;
    } else {
      throw new Error('file upload error');
    }
  };
  const uploadFile = async (req) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }

    const response = await fetch(`${constants.SERVER_DOMAIN}/file`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Authorization': globalConsumer.token,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };
  return (
    <div>
      <h1 className="title is-1">Submit New File</h1>
      <form className="card" onSubmit={handleFileSubmit} method="post" >
        <fieldset className="card-content content">
          <legend className="subtitle is-6">Enter file information</legend>
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
          <div className="file has-name">
            <label className="file-label" htmlFor="inputFile">
              <input className="file-input" id="inputFile" type="file" onChange={chooseFile} required/>
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
        <button className="button is-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitFile;
