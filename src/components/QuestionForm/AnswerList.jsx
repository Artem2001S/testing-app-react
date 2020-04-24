import React from 'react';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import List from 'components/List/List';
import DraggableList from 'components/DragAndDrop/DraggableList';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';

export default function AnswerList({
  answerInputs,
  inputChangeHandlers,
  onAnswerMove,
  onIsRightChange,
  onDeleteAnswer,
}) {
  return (
    <DraggableList onSuccessDrop={onAnswerMove}>
      {answerInputs.map((input, index) => (
        <List key={index} centered smallMargin>
          <Checkbox
            value={input.isRight}
            handleChange={onIsRightChange.bind(this, input.name)}
          />
          <TextInput
            value={input.value}
            handleChange={inputChangeHandlers[input.name]}
          />
          <Button
            transparent
            handleClick={onDeleteAnswer.bind(this, input.name)}
          >
            &times;
          </Button>
        </List>
      ))}
    </DraggableList>
  );
}
