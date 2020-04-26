import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from 'components/List/List';
import Draggable from './Draggable';
import classes from './DraggableList.module.scss';

export default function DraggableList({ children, onSuccessDrop }) {
  const initialDragState = {
    isDragging: false,
    draggedFrom: null,
    draggedTo: null,
  };

  const [dragState, setDragState] = useState(initialDragState);

  const onDragStart = (e) => {
    // set draggedFrom value
    setDragState({
      ...dragState,
      isDragging: true,
      draggedFrom: e.currentTarget.dataset.position,
    });

    //for Firefox
    e.dataTransfer.setData('text/html', '');
  };

  const onDragOver = (e) => {
    e.preventDefault();

    const draggedTo = e.currentTarget.dataset.position;

    // set draggedTo value
    setDragState({
      ...dragState,
      draggedTo,
    });
  };

  const onDragLeave = (e) => {
    e.target.classList.remove(classes.Dragging);
  };

  const onDrop = () => {
    setDragState(initialDragState);
  };

  return (
    <List vertical centered smallMargin>
      {children.map((node, index) => (
        <Draggable
          key={index}
          position={index}
          className={classNames({
            [classes.Dragging]:
              Number(dragState.draggedTo) === index && dragState.isDragging,
          })}
          onDragLeave={onDragLeave}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={() => {
            onDrop();
            onSuccessDrop(dragState.draggedFrom, dragState.draggedTo);
          }}
        >
          {node}
        </Draggable>
      ))}
    </List>
  );
}

DraggableList.propTyes = {
  children: PropTypes.node,
  onSuccessDrop: PropTypes.func,
};
