import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDragDrop from '../components/TemplateDragDrop';

// styles
const marginTop = {
  marginTop: '1.5rem',
};
const formStyles = {
  marginBottom: '50px',
  overflowX: 'scroll',
};

const dragDropContainerStyles = (height, width) => {
  return {
    height: height + 'px',
    width: width + 'px',
    border: '1px solid darkgray',
    background: 'lightgray',
  };
};

// constants
const DEFAULT_VIEW_OBJECT = {
  height: 250,
  x: 0,
  y: 0,
};
const DEFAULT_TEMPLATE_OBJECT = {
  name: '',
  height: 720,
};

const TemplateDesigner = () => {
  const globalConsumer = useContext(GlobalContext);

  const [viewOptions, setViewOptions] = useState([
    DEFAULT_VIEW_OBJECT,
    DEFAULT_VIEW_OBJECT,
  ]);
  const [templateOptions, setTemplateOptions] = useState(DEFAULT_TEMPLATE_OBJECT);

  const uploadTemplate = async (req) => {
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

  const handleXYChange = (viewNum, newXYViewOptionObj) => {
    const newOptions = [...viewOptions];
    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = {
      ...viewOptions[viewIndex],
      ...newXYViewOptionObj,
    };

    setViewOptions(newOptions);
  };

  const handleDragDropResize = (viewNum, newViewOptionObj) => {
    const newOptions = [...viewOptions];
    const viewIndex = viewNum - 1;
    newOptions[viewIndex] = newViewOptionObj;

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
          <fieldset className="field card" key={`view-fieldset-${viewNum}`}>
            <div className="card-content">
              <h3 className="is-size-5">View {viewNum} Options</h3>
              <div className="columns is-desktop">
                <div className="column">
                  <div className="field">
                    <label htmlFor="viewHeight" className="label">Height</label>
                    <div className="control is-expanded has-icons-left">
                      <input onChange={(evt) => handleViewOptionChange(viewNum, 'height', +evt.target.value)} id={'viewHeight' + viewNum} className="input" required type="number" value={currentValues.height}/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-ruler-vertical"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="viewWidth" className="label">Width</label>
                    <div className="control is-expanded has-icons-left">
                      <input onChange={(evt) => {
                        handleViewOptionChange(viewNum, 'width', +evt.target.value);
                      }} id={'viewWidth' + viewNum} className="input" type="number" value={currentValues.width}/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-ruler-horizontal"></i>
                      </span>
                    </div>
                    <p className="help">Leave blank to use 16:9 aspect ratio</p>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label htmlFor="viewX" className="label">X Coordinate</label>
                    <div className="control is-expanded has-icons-left">
                      <input onChange={(evt) => handleViewOptionChange(viewNum, 'x', evt.target.value)} id={'viewX' + viewNum} className="input" required type="number" value={currentValues.x}/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-arrows-alt-h"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="viewY" className="label">Y Coordinate</label>
                    <div className="control is-expanded has-icons-left">
                      <input onChange={(evt) => handleViewOptionChange(viewNum, 'y', evt.target.value)} id={'viewY' + viewNum} className="input" required type="number" value={currentValues.y}/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-arrows-alt-v"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>,
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
          <h2 className="title is-3" style={marginTop}>
            Define Views
          </h2>

          <h3 className="title is-5" style={marginTop}>
            Drag and Drop Editor
          </h3>
          <div
            style={dragDropContainerStyles(templateOptions.height, templateOptions.width || templateOptions.height * 16 / 9)}
            id="template-drag-drop-container"
          >
            <TemplateDragDrop
              handleDragDropResize={handleDragDropResize}
              handleXYChange={handleXYChange}
              viewOptions={viewOptions}
            />
          </div>

          {makeViewOptionInputs(viewOptions)}

          <button type="submit" className="button is-primary" style={marginTop}>
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateDesigner;
