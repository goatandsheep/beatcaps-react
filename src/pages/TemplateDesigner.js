import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDragDrop from '../components/TemplateDragDrop'

// styles
const marginTop = {
  marginTop: '1.5rem'
};
const formStyles = {
  marginBottom: '50px'
};
const dragDropContainerStyles = {
  height: '400px'
};
const viewInputStyles = {
  width: 'auto',
  minWidth: '75%'
};
const viewInputsGroupStyles = {
  display: 'flex',
  gap: '1rem'
};
const viewInputCol = {
  width: '50%'
};

// constants
const DEFAULT_VIEW_OBJECT = {
  height: null,
  width: null,
  x: null,
  y: null
}

const TemplateDesigner = () => {
  const globalConsumer = useContext(GlobalContext);

  const [viewOptions, setViewOptions] = useState([
  DEFAULT_VIEW_OBJECT, DEFAULT_VIEW_OBJECT
]);

  const uploadTemplate = async (req) => {
    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: viewOptions, // TODO: Send correct format
      headers: {
        Authorization: globalConsumer.user.token,
      },
    });

    return await response.json();
  };

  const handleViewOptionChange = (
    viewNum,
    field,
    value
  ) => {
    const newOptions = [...viewOptions]
    const viewIndex = viewNum - 1

    newOptions[viewIndex] = {
      ...viewOptions[viewIndex],
      [field]: +value
    }

    setViewOptions(newOptions)
  }

  const handleNumberOfViewsChange = (newNumOfViews) => {
    const newViewOptions = [...viewOptions]

    // recursive function to remove/add objects to have the right number of objects
    const makeNewOptionsArray = () => {
      if (newNumOfViews > newViewOptions.length) {
        newViewOptions.push(DEFAULT_VIEW_OBJECT)
        makeNewOptionsArray()
      } else if (newNumOfViews < newViewOptions.length) {
        newViewOptions.pop()
        makeNewOptionsArray()
      }
      return;
    }

    makeNewOptionsArray();
    setViewOptions(newViewOptions)
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();
    await uploadTemplate(event.target);

    window.location.href = '/templates';
  };

  const makeViewOptionInputs = () => {
    const fieldsets = []

    for (let viewNum = 1; viewNum <= viewOptions.length; viewNum++) {
      const currentValues = viewOptions[viewNum - 1]

      fieldsets.push(
        <fieldset className="field card">
          <div className="card-content">
            <h3 className="is-size-5">View {viewNum} Options</h3>
            <div style={viewInputsGroupStyles}>
              <div style={viewInputCol}>
                <label htmlFor="viewHeight" className="label">Height</label>
                <input onChange={(evt) => handleViewOptionChange(viewNum, 'height', evt.target.value)} id="viewHeight" className="input" type="number" style={viewInputStyles} value={currentValues.height}/>
                <label htmlFor="viewWidth" className="label">Width</label>
                <input onChange={(evt) => handleViewOptionChange(viewNum, 'width', evt.target.value)} id="viewWidth" className="input" type="number" style={viewInputStyles} value={currentValues.width}/>
              </div>
              <div style={viewInputCol}>
                <label htmlFor="viewX" className="label">X Coordinate</label>
                <input onChange={(evt) => handleViewOptionChange(viewNum, 'x', evt.target.value)} id="viewX" className="input" type="number" style={viewInputStyles} value={currentValues.x}/>
                <label htmlFor="viewY" className="label">Y Coordinate</label>
                <input onChange={(evt) => handleViewOptionChange(viewNum, 'y', evt.target.value)} id="viewY" className="input" type="number" style={viewInputStyles} value={currentValues.y}/>
              </div>
            </div>
          </div>
        </fieldset>
      )
    }

    return fieldsets;
  }
  
  return (
    <div>
      <h1 className="title is-1">Template Designer</h1>
      <form className="card has-text-left" onSubmit={handleSubmit} style={formStyles}>
        <div className="card-content card">
          <div className="field">
            <label htmlFor="viewName" className="label">Template Name</label>
            <div className="control">
              <input id="viewName" className="input" type="text" style={viewInputStyles}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="viewOutputHeight" className="label">Template Height</label>
            <div className="control">
              <input id="viewOutputHeight" className="input" type="number" style={viewInputStyles}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="viewOutputWidth" className="label">Template Width</label>
            <div className="control">
              <input id="viewOutputWidth" className="input" type="number" style={viewInputStyles}/>
            </div>
          </div>
          <label htmlFor="templateName" className="label">Number of videos in this template</label>
          <div className="control">
            <div id="templateName" className="select">        
                <select onChange={(e) => handleNumberOfViewsChange(e.target.value)} id="templateName">
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
            </div>
          </div>

          <h2 className="title is-4" style={marginTop}>Define Views</h2>
          {makeViewOptionInputs(viewOptions)}
          
          <h2 className="title is-4" style={marginTop}>Drag and Drop Editor</h2>
          <div class="card" style={dragDropContainerStyles}>
            <div className="card-container">
              <TemplateDragDrop />
            </div>
          </div>
          <button type="submit" className="button is-primary" style={marginTop}>Create Template</button>
        </div>
      </form>
    </div>
  );
};

export default TemplateDesigner;
