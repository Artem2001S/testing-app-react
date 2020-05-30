import React from 'react';
import PropTypes from 'prop-types';
import List from 'components/List/List';
import Button from 'components/UIElements/Button/Button';
import AnswerList from './AnswerList/AnswerList';
import TextInput from 'components/UIElements/TextInput/TextInput';

export default function QuestionForm({
  questionTitleInput,
  answerInputs,
  editMode,
  questionType,
  inputChangeHandlers,
  onIsRightChange,
  onChangeQuestionTitleInputValue,
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
          handleChange={onChangeQuestionTitleInputValue}
        />
        <Button onClick={onAddAnswer}>Add answer</Button>
        <AnswerList
          isRadioButtons={questionType === 'single'}
          answerInputs={answerInputs}
          inputChangeHandlers={inputChangeHandlers}
          onAnswerMove={onAnswerMove}
          onIsRightChange={onIsRightChange}
          onDeleteAnswer={onDeleteAnswer}
        />
        <Button onClick={onFormSubmit}>
          {editMode ? 'Save changes' : 'Add question'}
        </Button>
      </List>
    </>
  );
}

QuestionForm.propTypes = {
  questionTitleInput: PropTypes.object,
  answerInputs: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
  questionType: PropTypes.string.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
  onIsRightChange: PropTypes.func.isRequired,
  onChangeQuestionTitleInputValue: PropTypes.func.isRequired,
  onAnswerMove: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
