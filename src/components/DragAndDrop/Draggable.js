import React from 'react';
import PropTypes from 'prop-types';

export default function Draggable({
  position,
  children,
  onDragStart,
  onDragOver,
  onDrop,
  ...attrs
}) {
  return (
    <div
      data-position={position}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable
      {...attrs}
    >
      {children}
    </div>
  );
}

Draggable.propTypes = {
  position: PropTypes.number.isRequired,
  children: PropTypes.node,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};
