import React from 'react';
import PropTypes from 'prop-types';
import DragDropBox from './DragDropBox';
import {getUiWidthFromScreenWidth, getUiPxFromViewPx, getViewPxFromUiPx} from '../utils/templateUtils';

const dragDropContainerStyles = (height, width) => {
  return {
    height: height + 'px',
    width: width + 'px',
    boxSizing: 'border-box',
    background: 'lightgray',
    position: 'relative',
  };
};

dragDropContainerStyles.PropTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

const TemplateDragDrop = ({
  viewOptions,
  outputHeight,
  outputWidth,
  handleDragDropChange,
}) => {
  // calculate scale between template size and screen size
  const dragDropAreaWidth = getUiWidthFromScreenWidth(window.innerWidth);
  const scale = dragDropAreaWidth / outputWidth;
  const dragDropAreaHeight = getUiPxFromViewPx(outputHeight, scale);

  const handleDragDrop = (viewNum, uiViewOptions) => {
    // send correct template dimensions to form (using scale)
    handleDragDropChange(viewNum, {
      x: getViewPxFromUiPx(uiViewOptions.x, scale),
      y: getViewPxFromUiPx(uiViewOptions.y, scale),
      ...( uiViewOptions.height ? {height: getViewPxFromUiPx(uiViewOptions.height, scale)} : {}),
      ...( uiViewOptions.width ? {width: getViewPxFromUiPx(uiViewOptions.width, scale)} : {}),
    });
  };

  return (
    <div
      style={dragDropContainerStyles(dragDropAreaHeight, dragDropAreaWidth)}
      id="template-drag-drop-container"
    >
      {viewOptions.map((view, i) => {
        return (
          <DragDropBox
            key={`rnd-view-${i}`}
            box={{
              height: getUiPxFromViewPx(view.height, scale),
              width: getUiPxFromViewPx(view.width, scale),
              x: getUiPxFromViewPx(view.x, scale),
              y: getUiPxFromViewPx(view.y, scale),
              lockAspectRatio: view.lockAspectRatio,
            }}
            boxIndex={i}
            handleDragDrop={handleDragDrop}
          />
        );
      })}
    </div>
  );
};
export default TemplateDragDrop;
