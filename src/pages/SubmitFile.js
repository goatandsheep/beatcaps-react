import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const SubmitFile = () => {
  const globalConsumer = useContext(GlobalContext);
  const handleFileSubmit = async (event) => {
    // TODO: create FormData
    event.preventDefault();
    await uploadFile(new FormData(event.target));
    window.location.href = './89awefjsdfaksd';
  };
  const uploadFile = async (req) => {
    const response = await fetch(`${constants.SERVER_DOMAIN}/files`, {
      method: 'POST',
      body: req,
      headers: {
        Authorization: globalConsumer.user.token,
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
              <input className="file-input" id="inputFile" type="file" name="file" required/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file</span>
              </span>
              {/* <span className="file-name">N/A</span> */}
            </label>
          </div>
        </fieldset>
        <button className="button is-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitFile;
