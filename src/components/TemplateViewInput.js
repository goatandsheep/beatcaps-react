import React, {useState} from 'react';
import {get720pWidth} from '../utils/templateUtils';

const TemplateViewInput = ({fieldValue, viewNum, handleViewChange}) => {
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  const handleToggleAspectRatio = () => {
    if (keepAspectRatio) {
      // toggling off
      setKeepAspectRatio(false);
    } else {
      // toggling on, calculate width
      handleViewChange(
          viewNum,
          {width: get720pWidth(fieldValue.height)},
      );

      setKeepAspectRatio(true);
    }
  };

  const handleHeightChange = (newHeight) => {
    handleViewChange(
        viewNum,
        {
          height: newHeight,
          ...(keepAspectRatio ? {width: get720pWidth(newHeight)} : {}),
        },
    );
  };

  return (
    <fieldset className="field card" key={`view-fieldset-${viewNum}`}>
      <div className="card-content">
        <h3 className="is-size-5">View {viewNum} Options</h3>
        <div className="columns is-desktop">
          <div className="column">
            <div className="field">
              <label htmlFor="viewHeight" className="label">Height</label>
              <div className="control is-expanded has-icons-left">
                <input
                  onChange={(evt) => {
                    handleHeightChange(+evt.target.value);
                  }}
                  id={'viewHeight' + viewNum}
                  className="input"
                  required
                  type="number"
                  value={Math.ceil(fieldValue.height)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-ruler-vertical"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="viewWidth" className="label">Width</label>
              <div className="control is-expanded has-icons-left">
                <input
                  onChange={(evt) => {
                    handleViewChange(viewNum, {width: +evt.target.value});
                  }}
                  id={'viewWidth' + viewNum}
                  className="input"
                  type="number"
                  value={Math.ceil(fieldValue.width)}
                  disabled={keepAspectRatio}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-ruler-horizontal"></i>
                </span>
              </div>
              <div className="block mt-3">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    onChange={handleToggleAspectRatio} checked={keepAspectRatio}
                  />
                  <span className="ml-2">Use 16:9 aspect ratio</span>
                </label>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label htmlFor="viewX" className="label">X Coordinate</label>
              <div className="control is-expanded has-icons-left">
                <input
                  onChange={
                    (evt) => handleViewChange(viewNum, {x: +evt.target.value})
                  }
                  id={'viewX' + viewNum}
                  className="input"
                  required
                  type="number"
                  value={Math.ceil(fieldValue.x)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-arrows-alt-h"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="viewY" className="label">Y Coordinate</label>
              <div className="control is-expanded has-icons-left">
                <input
                  onChange={
                    (evt) => handleViewChange(viewNum, {y: +evt.target.value})
                  }
                  id={'viewY' + viewNum}
                  className="input"
                  required
                  type="number"
                  value={Math.ceil(fieldValue.y)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-arrows-alt-v"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default TemplateViewInput;
