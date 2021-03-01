import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import {Storage} from '@aws-amplify/storage';

const SubmitFile = () => {
  const globalConsumer = useContext(GlobalContext);

  const [misc, setMisc] = useState('');
  const chooseFile = async () => {
    const filename = document.querySelector('#inputFile').files[0].name;
    setMisc({name: filename});
  };
  const handleFileSubmit = async (event) => {
    // TODO: create FormData
    // TODO: append file to blob
    event.preventDefault();
    const file = event.target.files[0];
    const metadata = new FormData(event.target);
    delete metadata.files;
    const resp = await uploadFile(metadata);
    const awsResp = await Storage.put(file.name, file, {
      level: 'private',
      metadata,
    });
    if (resp.id) {
      window.location.href = `./${awsResp.id}`;
    } else {
      window.location.href = './89awefjsdfaksd';
    }
  };
  const uploadFile = async (req) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }

    const response = await fetch(`${constants.SERVER_DOMAIN}/file/new`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        Authorization: globalConsumer.token,
      },
    });
    return await response.json();
  };
  return (
    <div>
      <h1 className="title is-1">Submit New File</h1>
      <form className="card" onSubmit={handleFileSubmit} encType="multipart/form-data" method="post">
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
              <input className="file-input" id="inputFile" type="file" name="file" onChange={chooseFile} required/>
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
