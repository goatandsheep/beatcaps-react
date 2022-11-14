import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import {Link} from 'react-router-dom';
import API from '@aws-amplify/api';
import {get720pWidth} from '../utils/templateUtils';

const InputList = ({inputs}) => {
  if (!inputs) return (<option disabled>Loading</option>);
  return inputs.map((input, index) => (
    <option value={input.id} key={`${input.file}-${index}`}>{input.file}</option>
  ));
};

const ViewInputs = ({views = [], inputs = [], onChange}) => {
  return views.map((view, index) => {
    const num = index+1;
    return (
      <div className="field mb-5" key={`${view.name}-${index}`}>
        <label className="label" htmlFor={'media-' + num}>Video for View {num}</label>
        <div className="control has-icons-left">
          <span className="select">
            <select id={'media-' + num} className="input" name={'media-' + num} onChange={onChange} defaultValue="" required>
              <option disabled value="">Choose a video file</option>
              <InputList inputs={inputs} />
            </select>
          </span>
          <span className="icon is-small is-left">
            <i className="fas fa-photo-video"></i>
          </span>
        </div>
        <span className="is-italic">View dimensions: {view.height}px height x{' '}
          {view.width || Math.ceil(get720pWidth(view.height))}px width</span>
      </div>
    );
  });
};

const TemplateWizard = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [disableControls, setDisableControls] = useState(false);
  const [template, setTemplate] = useState(null);
  const [inputs, setInputs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${props.match.params.id}`, {
        headers: {
          'Authorization': globalConsumer.token,
          'X-Auth-Token': globalConsumer.user.identityId,
        },
      });
      const fileData = await response.json();

      // Error handling if error
      if (!fileData.message && fileData.views) {
        setTemplate(fileData);
      }
    };

    if (globalConsumer.token) {
      fetchData();
    }
  }, [globalConsumer, props.match]);

  useEffect(() => {
    const fetchInputs = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/file/list`, {
        headers: {
          'Authorization': globalConsumer.token,
          'X-Auth-Token': globalConsumer.user.identityId,
        },
      });
      const fileInputs = await response.json();
      setInputs(fileInputs);
    };

    if (globalConsumer.token) {
      fetchInputs();
    }
  }, [globalConsumer]);

  /**
   * Get the estimated value of the overleia output. Fetches for now, calculate later?
   * @return {Number} size of the output
   */
  const handleFileEstimation = () => {
    try {
      const time = 1; // where does this come from??
      const resolution = 1000; // this should come from template
      const compressionRatio = 0.65;
      return time * resolution * compressionRatio;
    } catch (err) {
      //
    }
  };

  /**
   *  TODO: fix so its right
   *  Check if it goes over Free Trial for Overleia
   *  @param {Number} estimation - estimate value from handleFileEstimation
   *  @return {Boolean} check of free trial
   */
  const checkFreeTrial = (estimation) => {
    // const storageEstimate = estimation + globalConsumer.storage;
    const storageEstimate = 1000000001;
    if ((storageEstimate) > 1000000000) return false;
    else return true;
  };

  /**
   * Toggles control over CSS for warning for going over free trial storage also disables submit
   *
   */
  const controlFreeTrial = () => {
    // if File Estimation greater than 1GB
    document.querySelector('#warning').classList.toggle('active');
    setDisableControls(!disableControls);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    const estimation = handleFileEstimation();
    if (checkFreeTrial(estimation)) {
      const metadata = Object.fromEntries((new FormData(event.target)).entries());
      metadata.inputs = [];
      for (let i = 0; i < template.views.length; i++) {
        metadata.inputs.push(metadata['media-' + (i+1)]);
        metadata['media-' + (i+1)] = undefined;
      }
      metadata.templateId = props.match.params.id;
      const fileResp = await uploadFile(metadata);
      window.location.href = `/file/${fileResp.id}`;
    } else {
      controlFreeTrial();
      setDisableControls(true);
    }
  };

  const clearErrControl = (evt) => {
    console.log('Im here', evt);
    controlFreeTrial();
    setDisableControls(true);
  };

  const uploadFile = async (req) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }
    req.type = 'Overleia';

    const fetchBody = {
      // method: 'POST',
      // body: JSON.stringify(req),
      body: req,
      headers: {
        'Authorization': globalConsumer.token,
        'X-Auth-Token': globalConsumer.user.identityId,
        // 'Content-Type': 'application/json',
      },
    };

    // const response = await fetch(`${constants.SERVER_DOMAIN}/jobs`, fetchBody);
    // return await response.json();

    return await API.post('OverleiaApi', '/jobs', fetchBody);
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
        template ? (
          <>
            <p>Template name: {template.name}</p>
            <p>Template height: {template.height}</p>
            <p>Template width: {template.width}</p>
            <p>Views in this template: {template.views.length}</p>
          </>
        ) : null
      }

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
            { template?.views && inputs ? <ViewInputs onChange={clearErrControl} inputs={inputs} views={template.views} /> : null}
          </fieldset>
          <div id="warning" className="mb-5 has-text-left">
            <p className="mb-1">
              <span className="has-text-weight-semibold is-size-5">
                Cannot build this video!
              </span>
              <br/>
                You will be going over your 1 GB of input/processed storage.</p>
            <p className="mb-1">To process a video this large please setup your payment details to purchase Storage.</p>
            <p>Note that beyond your free 1GB, it is $8.00 per GB of input/processed storage.</p>
          </div>
          <button id="submit-btn" disabled={disableControls} className="button is-primary block" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TemplateWizard;
