import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
      <div className="container">
        <Link to={`/templates/${template.id}/edit`} className="button">Edit
          <span className="icon is-small is-left ml-1">
            <i className="fas fa-edit"></i>
          </span>
        </Link>
        <Link to={`/templates/${template.id}/use`} className="button ml-5 is-primary">Create output from template
          <span className="icon is-small is-left ml-1">
            <i className="fas fa-plus"></i>
          </span>
        </Link>
      </div>
      <div className="card card-content content">
        {
          template?.views ?
          (
            <>
              <p className="subtitle is-5 has-text-left mb-0">
                <span className="has-text-weight-bold">ID</span>: <span>{template.id}</span>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <span className="has-text-weight-bold">Name</span>: <span>{template.name}</span>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <span className="has-text-weight-bold">Height in px</span>: <span>{template.height}</span>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <span className="has-text-weight-bold">Width in px</span>: <span>{template.width}</span>
              </p>
              <p className="subtitle is-5 has-text-left mb-0">
                <span className="has-text-weight-bold">Views in this template</span>: <span>{template.views.length}</span>
              </p>

              <h2 className="title is-4 mt-5">Views:</h2>
              {template.views.map((view, i) => {
                return (
                  <div className="card card-content content mt-5 has-text-left">
                    <h3 className="title is-5 my-2">View {i + 1}</h3>
                    <p className="mb-0">
                      <span className="has-text-weight-bold">Height</span>: <span>{view.height}</span>
                    </p>
                    <p className="mb-0">
                      <span className="has-text-weight-bold">Width</span>: <span>{view.width}</span>
                    </p>
                    <p className="mb-0">
                      <span className="has-text-weight-bold">X</span>: <span>{view.x}</span>
                    </p>
                    <p className="mb-0">
                      <span className="has-text-weight-bold">Y</span>: <span>{view.x}</span>
                    </p>
                  </div>
                );
              })}
            </>
          ) : <span className="is-loading">Loading</span>
        }
      </div>
    </div>
  );
};

export default TemplateDetailsPage;
