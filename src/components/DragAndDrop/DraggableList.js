import React, { useState, useCallback } from 'react';
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

  const handleDragStart = useCallback(
    (e) => {
      // set draggedFrom value
      setDragState({
        ...dragState,
        isDragging: true,
        draggedFrom: e.currentTarget.dataset.position,
      });

      //for Firefox
      e.dataTransfer.setData('text/html', '');
    },
    [dragState]
  );

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();

      const draggedTo = e.currentTarget.dataset.position;

      // set draggedTo value
      setDragState({
        ...dragState,
        draggedTo,
      });
    },
    [dragState]
  );

  const handleDragLeave = useCallback((e) => {
    e.target.classList.remove(classes.Dragging);
  }, []);

  const handleDrop = useCallback(() => {
    setDragState(initialDragState);
    onSuccessDrop(dragState.draggedFrom, dragState.draggedTo);
  }, [
    dragState.draggedFrom,
    dragState.draggedTo,
    initialDragState,
    onSuccessDrop,
  ]);

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
          onDragLeave={handleDragLeave}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {node}
        </Draggable>
      ))}
    </List>
  );
}

DraggableList.propTypes = {
  children: PropTypes.node,
  onSuccessDrop: PropTypes.func,
};
