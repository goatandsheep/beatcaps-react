import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const InputList = (props) => {
  if (!props.input) return ""

  return props.inputs.map((input, index) => (
    <option value={input.elementName} key={`${input.elementName}-${index}`}>{input.elementName}</option>
  ));
};

const ViewInput = (props) => {
  return props.views.map((view, index) => {
    const num = index+1;
    return (
      <div className="field" key={`${view.name}-${index}`}>
        <label className="label" htmlFor={'media-' + num}>Video for View {num}</label>
        <div className="control has-icons-left">
          <span className="select">
            <select id={'media-' + num} className="input" name={'media-' + num} required>
              <InputList inputs={props.inputs} />
            </select>
          </span>
          <span className="icon is-small is-left">
            <i className="fas fa-photo-video"></i>
          </span>
        </div>
        View dimensions: {view.height}px height, {view.width}px width
      </div>
    );
  });
};

const TemplateWizard = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [media, setMedia] = useState('');
  const [inputs, setInputs] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${props.id}`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileData = await response.json();
      setMedia(fileData);
    };
    const fetchInputs = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/file/list`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileInputs = await response.json();
      setInputs(fileInputs);
    };
    fetchInputs();
    fetchData();
  }, [globalConsumer, props.id]);

  const handleFileSubmit = async (event) => {
    // TODO: create FormData
    event.preventDefault();
    await uploadFile(new FormData(event.target));
    window.location.href = '/file/89awefjsdfaksd';
  };
  const uploadFile = async (req) => {
    const response = await fetch(`${constants.SERVER_DOMAIN}/jobs`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        Authorization: globalConsumer.user.token,
      },
    });
    return await response.json();
  };
  return (
    <div>
      <h1 className="title is-1">Build a new output</h1>
      {
        media ? (
          <>
            <p>Template name: {media.name}</p>
            <p>Template height: {media.height}</p>
            <p>Template width: {media.width}</p>
            <p>Videos in this template: {media.views.length}</p>
          </>
        ) : null
      }
      <div>
        <h2 className="subtitle is-3">Preview</h2>
        <div>Preview Coming soon...</div>
      </div>
      <form className="card" onSubmit={handleFileSubmit} encType="multipart/form-data" method="post">
        <fieldset className="card-content content">
          <legend className="subtitle is-3">Enter template inputs</legend>
          <ViewInput inputs={inputs.elements} views={media.views || []} />
        </fieldset>
        <button className="button is-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TemplateWizard;
