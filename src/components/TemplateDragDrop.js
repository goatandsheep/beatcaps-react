import React from 'react';
import DragDropBox from './DragDropBox';

const dragDropContainerStyles = (height, width) => {
  return {
    height: height + 'px',
    width: width + 'px',
    border: '1px solid darkgray',
    background: 'lightgray',
  };
};

const getUiWidthFromScreenWidth = (windowWidth) => {
  if (windowWidth > 1408) {
    return 1248;
  } else if (windowWidth > 1216) {
    return 1104;
  } else if (windowWidth > 1024) {
    return 912;
  } else {
    return windowWidth - (2 * 24)
  }
}

const getUiPxFromViewPx = (viewPx, scale) => {
  return viewPx * scale
}

const getViewPxFromUiPx = (uiPx, scale) => {
  return Math.round(uiPx / scale)
}

const TemplateDragDrop = ({
  viewOptions,
  outputHeight,
  outputWidth,
  handleDragDropChange,
}) => {
  const dragDropAreaWidth = getUiWidthFromScreenWidth(window.innerWidth);
  const scale = dragDropAreaWidth / outputWidth;
  const dragDropAreaHeight = getUiPxFromViewPx(outputHeight, scale);

  const handleDragDrop = (viewNum, uiViewOptions) => {
    handleDragDropChange(viewNum, {
      x: getViewPxFromUiPx(uiViewOptions.x, scale),
      y: getViewPxFromUiPx(uiViewOptions.y, scale),
      ...( uiViewOptions.height ? { height: getViewPxFromUiPx(uiViewOptions.height, scale)} : {}),
      ...( uiViewOptions.width ? { width: getViewPxFromUiPx(uiViewOptions.width, scale)} : {}),
    })
  }
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
            }} 
            boxIndex={i} 
            handleDragDrop={handleDragDrop}
          />
        )
      })}
    </div>
  );
};
export default TemplateDragDrop;
