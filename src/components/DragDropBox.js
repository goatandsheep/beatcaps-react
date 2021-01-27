import React from 'react';
import {Rnd} from 'react-rnd';

const dragDropBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};


const DragDropBox = ({
  box,
  boxIndex,
  handleDragDropChange
}) => {
  const boxNum = boxIndex + 1;
  console.log('box drag', boxIndex, box)
  return (
    <Rnd
      key={`rnd-view-${boxNum}`} 
      style={dragDropBoxStyles}
      bounds="#template-drag-drop-container"
      size={{
        width: box.width || box.height * 16 / 9,
        height: box.height,
      }}
      position={{x: box.x, y: box.y}}
      onDragStop={(e, d) => {
        console.log('drag stop', d.x, d.y)
        handleDragDropChange(boxNum, {x: d.x, y: d.y});
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        // Note: have to set a new X and Y after resize, otherwise the box "jumps" if user drags from top or left corners
        handleDragDropChange(boxNum, {
          width: +ref.style.width.replace('px', ''),
          height: +ref.style.height.replace('px', ''),
          x: position.x,
          y: position.y,
        });
      }}
      // scale={0.7125}
    >
      View {boxNum}
    </Rnd>
  );
};
export default DragDropBox;
