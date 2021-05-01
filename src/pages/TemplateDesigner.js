import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDragDrop from '../components/TemplateDragDrop';
import {DEFAULT_VIEW_OBJECT, DEFAULT_TEMPLATE_OBJECT, get720pWidth, viewSizeErrors} from '../utils/templateUtils';
import TemplateViewInput from '../components/TemplateViewInput';

// styles
const formStyles = {
  marginBottom: '50px',
  overflowX: 'scroll',
};

const TemplateDesigner = () => {
  const globalConsumer = useContext(GlobalContext);

  const [viewOptions, setViewOptions] = useState([
    DEFAULT_VIEW_OBJECT,
    DEFAULT_VIEW_OBJECT,
  ]);
  const [templateOptions, setTemplateOptions] = useState(DEFAULT_TEMPLATE_OBJECT);
  const [templateKeepsAspectRatio, setTemplateKeepsAspectRatio] = useState(true);

  const uploadTemplate = async () => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }
    const templateReq = templateOptions;
    templateReq.views = viewOptions;

    // don't send the width to the backend if using default 16:9
    if (templateKeepsAspectRatio) {
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
    const newOptions = [...viewOptions];

    // each view's width and height shouldn't exceed the template's width and height.
    // This code is to account for rounding to accomodate different screen widths.
    const cappedFieldOptions = {
      width: fieldOptions.width < templateOptions.width ? fieldOptions.width : templateOptions.width,
      height: fieldOptions.height < templateOptions.height ? fieldOptions.height : templateOptions.height,
    };

    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = {
      ...viewOptions[viewIndex],
      ...cappedFieldOptions,
    };

    setViewOptions(newOptions);
  };

  // Update Template Options
  const handleTemplateOptionChange = (field, value) => {
    const newOptions = {...templateOptions};

    newOptions[field] = value;

    // if templateKeepsAspectRatio is selected, recalculate the width every time height changes
    if (templateKeepsAspectRatio) {
      newOptions.width = get720pWidth(newOptions.height);
    }

    setTemplateOptions(newOptions);
  };

  // When user changes the number of views, create or remove view option forms to match.
  const handleNumberOfViewsChange = (newNumOfViews) => {
    const newViewOptions = [...viewOptions];

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
    setViewOptions(newViewOptions);
  };

  const handleToggleAspectRatio = () => {
    if (templateKeepsAspectRatio) {
      // toggling off
      setTemplateKeepsAspectRatio(false);
    } else {
      // toggling on, calculate width
      handleTemplateOptionChange('width', get720pWidth(templateOptions.height));
      setTemplateKeepsAspectRatio(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const viewErrors = viewSizeErrors(
        {
          views: viewOptions,
          maxHeight: templateOptions.height,
          maxWidth: templateOptions.width,
        },
    );

    if (viewErrors) {
      alert(viewErrors);
      return;
    }

    await uploadTemplate();

    window.location.href = '/templates';
  };

  const makeViewOptionInputs = () => {
    const fieldsets = [];

    for (let viewNum = 1; viewNum <= viewOptions.length; viewNum++) {
      const currentValues = viewOptions[viewNum - 1];

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
                value={templateOptions.name}
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
                value={templateOptions.height}
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
                disabled={templateKeepsAspectRatio}
                value={templateOptions.width}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-ruler-horizontal"></i>
              </span>
            </div>
            <div className="block mt-3">
              <label className="checkbox">
                <input type="checkbox" onChange={handleToggleAspectRatio} checked={templateKeepsAspectRatio}/>
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
                  value={viewOptions.length}
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
            viewOptions={viewOptions}
            outputHeight={templateOptions.height}
            outputWidth={templateOptions.width}
          />

          {/* Render a template option form for each video */}
          {makeViewOptionInputs(viewOptions)}

          <button type="submit" className="button is-primary mt-5">
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateDesigner;
