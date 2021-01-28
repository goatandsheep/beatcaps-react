import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDragDrop from '../components/TemplateDragDrop';
import {DEFAULT_VIEW_OBJECT, DEFAULT_TEMPLATE_OBJECT} from '../utils/templateUtils'
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

  const uploadTemplate = async () => {
    const templateReq = templateOptions;
    templateReq.views = viewOptions;
    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: JSON.stringify(templateReq), // TODO: Send correct format
      headers: {
        Authorization: globalConsumer.user.token,
      },
    });

    return await response.json();
  };

  const handleViewOptionChange = (
      viewNum,
      field,
      value,
  ) => {
    const newOptions = [...viewOptions];

    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = {
      ...viewOptions[viewIndex],
      [field]: +value,
    };

    setViewOptions(newOptions);
  };

  const handleDragDropChange = (viewNum, newXYViewOptionObj) => {
    const newOptions = [...viewOptions];
    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = {
      ...viewOptions[viewIndex],
      ...newXYViewOptionObj,
    };

    setViewOptions(newOptions);
  };

  const handleTemplateOptionChange = (field, value) => {
    const newOptions = {...templateOptions};

    newOptions[field] = value;

    setTemplateOptions(newOptions);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await uploadTemplate(event.target);

    window.location.href = '/templates';
  };

  const makeViewOptionInputs = () => {
    const fieldsets = [];

    for (let viewNum = 1; viewNum <= viewOptions.length; viewNum++) {
      const currentValues = viewOptions[viewNum - 1];

      fieldsets.push(
          <TemplateViewInput 
            fieldValue={currentValues} 
            viewNum={viewNum} 
            handleViewOptionChange={handleViewOptionChange}
          />
      );
    }

    return fieldsets;
  };

  return (
    <div>
      <h1 className="title is-1">Template Designer</h1>
      <form
        className="card has-text-left"
        onSubmit={handleSubmit}
        style={formStyles}
      >
        <div className="card-content card">
          <div className="field">
            <label htmlFor="viewName" className="label">
              Template Name
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
              Template Height
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
                value={templateOptions.width}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-ruler-horizontal"></i>
              </span>
            </div>
            <p className="help">Leave blank to use 16:9 aspect ratio</p>
            <button
              onClick={(e) => handleTemplateOptionChange('width', 0)}
              className="button is-info"
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
            handleDragDropChange={handleDragDropChange}
            viewOptions={viewOptions}
            outputHeight={templateOptions.height}
            outputWidth={templateOptions.width || (templateOptions.height * 16) / 9}
          />

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
