import React, { useCallback } from 'react';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import RadioButton from 'components/UIElements/RadioButton/RadioButton';
import Button from 'components/UIElements/Button/Button';
import classes from './AnswerListItem.module.scss';

function AnswerListItem({
  isRadioButtons,
  inputValue,
  inputName,
  isRight,
  onIsRightChange,
  onDeleteAnswer,
  onInputValueChange,
}) {
  const deleteAnswer = useCallback(() => onDeleteAnswer(inputName), [
    inputName,
    onDeleteAnswer,
  ]);

  const rightChange = useCallback(
    (e) => onIsRightChange(inputName, isRadioButtons, e),
    [inputName, isRadioButtons, onIsRightChange]
  );

  return (
    <>
      {isRadioButtons ? (
        <RadioButton value={isRight} handleChange={rightChange} />
      ) : (
        <Checkbox value={isRight} handleChange={rightChange} />
      )}

      <TextInput
        className={classes.Input}
        value={inputValue}
        handleChange={onInputValueChange}
      />
      <Button transparent handleClick={deleteAnswer}>
        &times;
      </Button>
    </>
  );
}

export default React.memo(AnswerListItem);
