import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
// import {Link} from 'react-router-dom';
import API from '@aws-amplify/api';

const InputList = ({inputs}) => {
  if (!inputs) return (<option disabled>Loading</option>);
  return inputs.map((input, index) => (
    <option value={input.id} key={`${input.file}-${index}`}>{input.file}</option>
  ));
};

const ViewInputs = ({inputs = [], onChange}) => {
  return (
    <div className="field mb-5" >
      <div className="control has-icons-left">
        <span className="select">
          <select id='media' className="input" name='media' onChange={onChange} required defaultValue="">
            <option disabled value="">Choose a video file</option>
            <InputList inputs={inputs} />
          </select>
        </span>
        <span className="icon is-small is-left">
          <i className="fas fa-photo-video"></i>
        </span>
      </div>
    </div>
  );
};

const BeatcapsWizard = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [errControl, setErrControl] = useState(false);
  const [inputs, setInputs] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${props.match.params.id}`, {
  //       headers: {
  //         'Authorization': globalConsumer.token,
  //         'X-Auth-Token': globalConsumer.user.identityId,
  //       },
  //     });
  //     const fileData = await response.json();

  //     // Error handling if error
  //     if (!fileData.message && fileData.views) {
  //       setTemplate(fileData);
  //     }
  //   };

  //   if (globalConsumer.token) {
  //     fetchData();
  //   }
  // }, [globalConsumer, props.match]);

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

  const handleFileEstimation = async () => {
    try {
      const response = await fetch(`${constants.SERVER_DOMAIN}/usage/`, {
        method: 'POST',
        headers: {
          'Authorization': globalConsumer.token,
          'Content-Type': 'application/json',
          'X-Auth-Token': globalConsumer.user.identityId,
        },
      });
      const beatcapsEstimation = await response.json();
      return beatcapsEstimation;
    } catch (err) {
      //
    }
  };

  const checkFreeTrial = (estimation) => {
    // const storageEstimate = estimation + globalConsumer.storage;
    console.log('globalConsumer', globalConsumer.usage.storage);
    const storageEstimate = 1;
    // const storageEstimate = 1000000001;
    if ((storageEstimate) > 1000000000) return false;
    else return true;
  };

  const controlFreeTrial = () => {
    // if File Estimation greater than 1GB
    document.querySelector('#warning').classList.toggle('active');
    const submitBtn = document.querySelector('#submit-btn').disabled;
    document.querySelector('#submit-btn').disabled = !submitBtn;
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    const estimation = handleFileEstimation();
    if (checkFreeTrial(estimation)) {
      const metadata = Object.fromEntries((new FormData(event.target)).entries());
      console.log('metadata', metadata);
      const inputNameSegs = metadata.media.split('.');
      inputNameSegs.pop();
      metadata.name = inputNameSegs.join('.');
      metadata.inputs = [];
      // for (let i = 0; i < template.views.length; i++) {
      metadata.inputs.push(metadata['media']);
      //   metadata['media-' + (i+1)] = undefined;
      // }
      // metadata.templateId = props.match.params.id;
      const fileResp = await uploadFile(metadata);
      window.location.href = `/file/${fileResp.id}`;
    } else {
      controlFreeTrial();
      setErrControl(true);
    }
  };
  const clearErrControl = (evt) => {
    console.log('Im here', evt);
    controlFreeTrial();
    setErrControl(false);
  };

  const uploadFile = async (req) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }
    req.type = 'BeatCaps';

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

      <form className="card mt-2 has-text-left" onSubmit={handleFileSubmit} encType="multipart/form-data" method="post">
        <div className="card-content content">
          <fieldset className="block">
            <legend className="subtitle is-5">Choose videos for each view:</legend>
            <ViewInputs inputs={inputs} onChange={clearErrControl} />
          </fieldset>
          <div id="warning" className="mb-5">
            <p className="mb-1">
              <span className="has-text-weight-semibold is-size-5">
                Cannot proccess this video!
              </span>
              <br/>
                You will be going over your 10 Free Beatcaps Processing Minutes.</p>
            <p className="mb-1">To process a video this large please setup your payment details to purchase process time.</p>
            <p>Note that beyond your free 10 minutes, it is $0.08 per second of processing.</p>
          </div>
          <button id="submit-btn" className="button is-primary block" disabled={errControl} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BeatcapsWizard;
