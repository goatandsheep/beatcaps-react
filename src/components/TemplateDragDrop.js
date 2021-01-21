import React from 'react';
import {Rnd} from 'react-rnd';

const dropboxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

const TemplateDragDrop = ({
  handleDragDropResize,
  viewOptions,
  handleXYChange,
}) => {
  return (
    <>
      {viewOptions.map((_view, i) => {
        const viewNum = i + 1;

        return (<Rnd
          key={`rnd-view-${viewNum}`}
          style={dropboxStyles}
          bounds="#template-drag-drop-container"
          size={{
            width: viewOptions[i].width || (viewOptions[i].height * 16) / 9,
            height: viewOptions[i].height,
          }}
          position={{x: viewOptions[i].x, y: viewOptions[i].y}}
          onDragStop={(_e, d) => {
            handleXYChange(viewNum, {x: d.x, y: d.y});
          }}
          onResizeStop={(_e, _direction, ref, _delta, position) => {
            // Note: have to set a new X and Y after resize, otherwise the box "jumps" if user drags from top or left corners
            handleDragDropResize(viewNum, {
              width: +ref.style.width.replace('px', ''),
              height: +ref.style.height.replace('px', ''),
              x: position.x,
              y: position.y,
            });
          }}
        >
          View {viewNum}
        </Rnd>);
      })}
    </>
  );
};
export default TemplateDragDrop;
