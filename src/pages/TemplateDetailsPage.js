import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const TemplateDetailsPage = (props) => {
  const globalConsumer = useContext(GlobalContext);

  const [template, setTemplate] = useState('');

  useEffect(() => {
    // I copied and pasted this function from TemplateWizard, should eventually consolidate them.
    const fetchTemplateData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${props.match.params.id}`, {
        headers: {
          Authorization: globalConsumer.token,
        },
      });
      const fileData = await response.json();
      setTemplate(fileData);
    };

    fetchTemplateData();
  }, [globalConsumer.token, props.match.params.id]);

  return (
    <div>
      <h1 className="title is-2">Template Details</h1>
      <div className="card card-content content">
        {
          template?.views ?
          (
            <>
              <p className="subtitle is-5 has-text-left mb-0">
                <label>ID</label>: <strong>{template.id}</strong>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <label>Name</label>: <strong>{template.name}</strong>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <label>Height in px</label>: <strong>{template.height}</strong>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <label>Width in px</label>: <strong>{template.width}</strong>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <label>Views in this template</label>: <strong>{template.views.length}</strong>
              </p>
            </>
          ) : <span className="is-loading">Loading</span>
        }

      </div>
    </div>
  );
};

export default TemplateDetailsPage;
