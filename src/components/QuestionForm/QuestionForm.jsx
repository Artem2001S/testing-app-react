import React from 'react';
import PropTypes from 'prop-types';
import List from 'components/List/List';
import Button from 'components/UIElements/Button/Button';
import AnswerList from './AnswerList';
import TextInput from 'components/UIElements/TextInput/TextInput';

export default function QuestionForm({
  questionTitleInput,
  answerInputs,
  editMode,
  inputChangeHandlers,
  changeCheckboxValue,
  changeQuestionTitleInputValue,
  onAnswerMove,
  onAddAnswer,
  onDeleteAnswer,
  onFormSubmit,
}) {
  return (
    <>
      <List centered vertical>
        <TextInput
          label={questionTitleInput.label}
          value={questionTitleInput.value}
          handleChange={changeQuestionTitleInputValue}
        />
        <Button handleClick={onAddAnswer}>Add answer</Button>
        <AnswerList
          answerInputs={answerInputs}
          inputChangeHandlers={inputChangeHandlers}
          onAnswerMove={onAnswerMove}
          onIsRightChange={changeCheckboxValue}
          onDeleteAnswer={onDeleteAnswer}
        />
        <Button handleClick={onFormSubmit}>
          {editMode ? 'Save changes' : 'Add'}
        </Button>
      </List>
    </>
  );
}

QuestionForm.propTypes = {
  editMode: PropTypes.bool,
};
