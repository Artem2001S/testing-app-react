import React from 'react';
import PropTypes from 'prop-types';
import List from 'components/List/List';
import DraggableList from 'components/DragAndDrop/DraggableList';
import AnswerListItem from './AnswerListItem/AnswerListItem';

export default function AnswerList({
  answerInputs,
  isRadioButtons,
  inputChangeHandlers,
  onAnswerMove,
  onIsRightChange,
  onDeleteAnswer,
}) {
  return (
    <DraggableList onSuccessDrop={onAnswerMove}>
      {answerInputs.map((input, index) => (
        <List key={index} centered smallMargin>
          <AnswerListItem
            isRight={input.isRight}
            isRadioButtons={isRadioButtons}
            inputName={input.name}
            inputValue={input.value}
            onInputValueChange={inputChangeHandlers[input.name]}
            onDeleteAnswer={onDeleteAnswer}
            onIsRightChange={onIsRightChange}
          />
        </List>
      ))}
    </DraggableList>
  );
}

AnswerList.propTypes = {
  answerInputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
  onAnswerMove: PropTypes.func.isRequired,
  onIsRightChange: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
};
