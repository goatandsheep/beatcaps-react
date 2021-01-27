import React, {useState} from 'react';
import DragDropBox from './DragDropBox';

const dragDropContainerStyles = (height, width) => {
  return {
    height: height + 'px',
    width: width + 'px',
    border: '1px solid darkgray',
    background: 'lightgray',
  };
};

const TemplateDragDrop = ({
  viewOptions,
  outputHeight,
  outputWidth,
  handleDragDropChange,
}) => {
  const uiOutputWidth = outputWidth;
  const uiOutputHeight = outputHeight;
  const dragDropAreaWidth = 912;
  const widthRatio = window.innerWidth / outputWidth;

  // const [uiViewOptions, setUiViewOptions] = useState([
  //   x: 
  // ])
  console.log('video width', outputWidth);
  console.log('window width', window.innerWidth);

  // uiOptions = [uiX, uiY, uiWidth, uiHeight]

  return (
    <div
      style={dragDropContainerStyles(dragDropAreaWidth / 16 * 9, dragDropAreaWidth)}
      id="template-drag-drop-container"
    >
      {viewOptions.map((view, i) => {
        return (
          <DragDropBox 
            box={view} 
            boxIndex={i} 
            handleDragDropChange={handleDragDropChange}
          />
        )
      })}
    </div>
  );
};
export default TemplateDragDrop;

// minwidth// content card width
// 1408 1248 width 
// 1216 1104
// 1024 912
// less 1024 = width - (2 * 24px)

// 912/1280 = 0.7125
// 1280/ = 0.7125