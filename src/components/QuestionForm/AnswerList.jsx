import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import List from 'components/List/List';
import DraggableList from 'components/DragAndDrop/DraggableList';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import classes from './AnswerList.module.scss';
import RadioButton from 'components/UIElements/RadioButton/RadioButton';

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
          {isRadioButtons ? (
            <RadioButton
              value={input.isRight}
              handleChange={onIsRightChange.bind(
                this,
                input.name,
                isRadioButtons
              )}
            />
          ) : (
            <Checkbox
              value={input.isRight}
              handleChange={onIsRightChange.bind(
                this,
                input.name,
                isRadioButtons
              )}
            />
          )}

          <TextInput
            className={classes.Input}
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

AnswerList.propTypes = {
  answerInputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
  onAnswerMove: PropTypes.func.isRequired,
  onIsRightChange: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
};
