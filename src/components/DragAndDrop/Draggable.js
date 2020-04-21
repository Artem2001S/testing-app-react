import React from 'react';

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
