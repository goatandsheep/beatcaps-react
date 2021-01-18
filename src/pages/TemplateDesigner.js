import React, {useContext, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const marginTop = {marginTop: '1.5rem'};
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

const MIN_VIEWS_PER_TEMPLATE = 2
const MAX_VIEWS_PER_TEMPLATE = 5

const TemplateDesigner = () => {
  const globalConsumer = useContext(GlobalContext);

  const [numberOfViews, setNumberOfViews] = useState(2);

  const uploadTemplate = async (req) => {
    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: req,
      headers: {
        Authorization: globalConsumer.user.token,
      },
    });

    return await response.json();
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    await uploadTemplate(new FormData(event.target));
    window.location.href = '/file/89awefjsdfaksd';
  };

  const makeViewInputs = () => {
    const inputs = []

    for (let viewNum = MIN_VIEWS_PER_TEMPLATE; viewNum <= MAX_VIEWS_PER_TEMPLATE; viewNum++) {
      const id = `videoSlotOption${viewNum}`
      
      inputs.push(
        <option key={id} value={viewNum}>
          {viewNum}
        </option>
      )
    }

    return inputs;
  }

  const makeViewOptionInputs = () => {
    const fieldsets = []

    for (let viewNum = 1; viewNum <= numberOfViews; viewNum++) {
      fieldsets.push(
        <fieldset className="field card">
          <div className="card-content">
            <h3 className="is-size-5">View {viewNum} Options</h3>
            <div style={viewInputsGroupStyles}>
              <div style={viewInputCol}>
                <label htmlFor="viewHeight" className="label">Height</label>
                <input id="viewHeight" className="input" type="number" style={viewInputStyles}/>
                <label htmlFor="viewWidth" className="label">Width</label>
                <input id="viewWidth" className="input" type="number" style={viewInputStyles}/>
              </div>
              <div style={viewInputCol}>
                <label htmlFor="viewX" className="label">X Coordinate</label>
                <input id="viewX" className="input" type="number" style={viewInputStyles}/>
                <label htmlFor="viewY" className="label">Y Coordinate</label>
                <input id="viewY" className="input" type="number" style={viewInputStyles}/>
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
      <form className="card has-text-left">
        <div className="card-content card">
          <div className="field">
            <label htmlFor="viewName" className="label">Template Name</label>
            <div className="control">
              <input id="viewName" className="input" type="text" style={viewInputStyles}/>
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
                <select onChange={(event) => setNumberOfViews(event.target.value)} id="templateName">
                  {makeViewInputs()}
                </select>
            </div>
          </div>

          <h2 className="title is-3" style={marginTop}>Define Views</h2>
          {makeViewOptionInputs()}

          <button onClick={handleSubmit} className="button is-primary" style={marginTop}>Create Template</button>
        </div>
      </form>
    </div>
  );
};

export default TemplateDesigner;
