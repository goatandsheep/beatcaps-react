import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import {Link} from 'react-router-dom';

const InputList = ({inputs}) => {
  if (!inputs) return (<option disabled>Loading</option>);

  return inputs.map((input, index) => (
    <option value={input.elementName} key={`${input.elementName}-${index}`}>{input.elementName}</option>
  ));
};

const ViewInputs = (props) => {
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
        <span className="is-italic">View dimensions: {view.height}px height x {view.width}px width</span>
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
      <div className="has-text-left">
        <Link to="/templates" className="button is-text">
          <span className="icon is-small mr-1">
            <i className="fas fa-chevron-circle-left"></i>
          </span>
          Return to Template List
        </Link>
      </div>
      <h1 className="title is-1">Build a new output</h1>
      {
        media ? (
          <>
            <p>Template name: {media.name}</p>
            <p>Template height: {media.height}</p>
            <p>Template width: {media.width}</p>
            <p>Views in this template: {media.views.length}</p>
          </>
        ) : null
      }
      <div>
        <h2 className="subtitle is-4 mt-2">Preview</h2>
        <div>Preview Coming soon...</div>
      </div>
      <form className="card mt-2 has-text-left" onSubmit={handleFileSubmit} encType="multipart/form-data" method="post">
        <div className="card-content content">
          <label htmlFor="outputName" className="label">
            Output Video Name
          </label>
          <div className="control is-expanded has-icons-left block">
            <input
              id="outputName"
              className="input"
              name="name"
              required
              type="text"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-signature"></i>
            </span>
          </div>
          <fieldset className="block">
            <legend className="subtitle is-5">Choose videos for each view:</legend>
            <ViewInputs inputs={inputs.elements} views={media.views || []} />
          </fieldset>
          <button className="button is-primary block" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TemplateWizard;
