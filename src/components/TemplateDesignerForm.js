/* eslint-disable no-unused-vars */
import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDragDrop from '../components/TemplateDragDrop';
import {DEFAULT_VIEW_OBJECT, DEFAULT_TEMPLATE_OBJECT, get720pWidth, viewSizeErrors, getConfinedViewOptions} from '../utils/templateUtils';
import TemplateViewInput from '../components/TemplateViewInput';

// styles
const formStyles = {
  marginBottom: '50px',
  overflowX: 'scroll',
};

const TemplateDesignerForm = ({initialTemplateData = DEFAULT_TEMPLATE_OBJECT}) => {
  const globalConsumer = useContext(GlobalContext);
  const history = useHistory();

  const [formData, setFormData] = useState(initialTemplateData);

  const uploadTemplate = async () => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }
    const templateReq = {...formData};

    // don't send the width to the backend if using default 16:9
    if (templateReq.lockAspectRatio) {
      delete templateReq.width;
    }

    // check if 16:9 is used in any views
    templateReq.views.forEach((view) => {
      if (view.width === get720pWidth(view.height)) {
        delete view.width;
      }
    });

    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: JSON.stringify(templateReq),
      headers: {
        'Authorization': globalConsumer.token,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };

  // Update View options for the correct view
  const handleViewOptionChange = (
      viewNum,
      fieldOptions,
  ) => {
    const newOptions = [...formData.views];

    // each view's width and height shouldn't exceed the template's width and height.
    // This code is to account for rounding to accomodate different screen widths.
    const cappedFieldOptions = getConfinedViewOptions(fieldOptions, formData);

    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = {
      ...formData.views[viewIndex],
      ...cappedFieldOptions,
    };

    setFormData({...formData, views: newOptions});
  };

  // Update Template Options
  const handleTemplateOptionChange = (field, value) => {
    const newOptions = {...formData};

    newOptions[field] = value;

    // if templateKeepsAspectRatio is selected, recalculate the width every time height changes
    if (newOptions.lockAspectRatio) {
      newOptions.width = get720pWidth(newOptions.height);
    }

    setFormData(newOptions);
  };

  // When user changes the number of views, create or remove view option forms to match.
  const handleNumberOfViewsChange = (newNumOfViews) => {
    const newViewOptions = [...formData.views];

    // recursive function to remove/add objects to have the right number of objects
    const makeNewOptionsArray = () => {
      if (newNumOfViews > newViewOptions.length) {
        newViewOptions.push(DEFAULT_VIEW_OBJECT);
        makeNewOptionsArray();
      } else if (newNumOfViews < newViewOptions.length) {
        newViewOptions.pop();
        makeNewOptionsArray();
      }
      return;
    };

    makeNewOptionsArray();
    setFormData({...formData, views: newViewOptions});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const viewErrors = viewSizeErrors(
        {
          views: formData.views,
          maxHeight: formData.height,
          maxWidth: formData.width,
        },
    );

    if (viewErrors) {
      alert(viewErrors);
      return;
    }

    await uploadTemplate();

    history.push('/templates');
  };

  const makeViewOptionInputs = (inputs) => {
    const fieldsets = [];

    for (let viewNum = 1; viewNum <= inputs.length; viewNum++) {
      const currentValues = inputs[viewNum - 1];

      fieldsets.push(
          <TemplateViewInput
            key={`TemplateViewInput-${viewNum}`}
            fieldValue={currentValues}
            viewNum={viewNum}
            handleViewChange={handleViewOptionChange}
          />,
      );
    }

    return fieldsets;
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
      <h1 className="title is-1">Template Designer</h1>
      <form
        className="card has-text-left"
        onSubmit={handleSubmit}
        style={formStyles}
      >
        <div className="card-content card">
          <div className="field">
            <label htmlFor="viewName" className="label">
              Template Name *
            </label>
            <div className="control is-expanded has-icons-left">
              <input
                onChange={(e) => handleTemplateOptionChange('name', e.target.value)
                }
                id="viewName"
                className="input"
                required
                type="text"
                value={formData.name}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-signature"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="viewOutputHeight" className="label">
              Template Height *
            </label>
            <div className="control is-expanded has-icons-left">
              <input
                onChange={(e) =>
                  handleTemplateOptionChange('height', +e.target.value)
                }
                id="viewOutputHeight"
                className="input"
                required
                type="number"
                value={Math.ceil(formData.height)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-ruler-vertical"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="viewOutputWidth" className="label">
              Template Width
            </label>

            <div className="control is-expanded has-icons-left">
              <input
                onChange={(e) =>
                  handleTemplateOptionChange('width', +e.target.value)
                }
                id="viewOutputWidth"
                className="input"
                type="number"
                disabled={formData.lockAspectRatio}
                value={Math.ceil(formData.width)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-ruler-horizontal"></i>
              </span>
            </div>
            <div className="block mt-3">
              <label className="checkbox">
                <input type="checkbox" onChange={(e) =>
                  handleTemplateOptionChange('lockAspectRatio', !formData.lockAspectRatio)
                } checked={formData.lockAspectRatio}/>
                <span className="ml-2">Use 16:9 aspect ratio</span>
              </label>
            </div>
            <button
              onClick={() => handleTemplateOptionChange('width', 0)}
              className="button is-light"
              type="button"
            >
              Clear
            </button>
          </div>
          <div className="field">
            <label htmlFor="templateName" className="label">
              Number of videos in this template
            </label>
            <div className="control is-expanded has-icons-left">
              <div id="templateName" className="select">
                <select
                  onChange={(e) => handleNumberOfViewsChange(e.target.value)}
                  id="templateName"
                  required
                  value={formData.views.length}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <span className="icon is-small is-left">
                <i className="fas fa-list"></i>
              </span>
            </div>
          </div>
          <h2 className="title is-3 mt-5">
            Define Views
          </h2>

          <h3 className="title is-5 mt-5">
            Drag and Drop Editor
          </h3>

          <TemplateDragDrop
            handleDragDropChange={handleViewOptionChange}
            viewOptions={formData.views}
            outputHeight={formData.height}
            outputWidth={formData.width}
          />

          {/* Render a template option form for each video */}
          {makeViewOptionInputs(formData.views)}

          <button type="submit" className="button is-primary mt-5">
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateDesignerForm;
