import React from 'react';
import { connect } from 'react-redux';
import List from 'components/List/List';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getTest } from 'redux/selectors/test';
import {
  sendRequestToDeleteQuestion,
  openModalDialog,
  startNumericQuestionEditing,
  startQuestionEditing,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';

function QuestionList({ questions, onDelete, startQuestionEditing }) {
  return (
    <List vertical centered>
      {questions.length === 0 ? (
        <h3>Add the first question!</h3>
      ) : (
          questions.map((question, index) => (
            <QuestionListItem
              key={index}
              type={question.question_type}
              {...question}
              startQuestionEditing={startQuestionEditing.bind(this, question)}
              onDelete={onDelete.bind(this, question.id)}
            />
          ))
        )}
    </List>
  );
}

const mapStateToProps = (state) => ({
  testId: getTest(state).id,
  questions: getTest(state).questions,
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) =>
    dispatch(
      openModalDialog('Delete question ?', () =>
        dispatch(sendRequestToDeleteQuestion(id))
      )
    ),
  showModalDialog: (
    title,
    successBtnClickHandler,
    primaryButtonText,
    children
  ) =>
    dispatch(
      openModalDialog(
        title,
        successBtnClickHandler,
        primaryButtonText,
        children
      )
    ),
  initNumericQuestionEditingForm: (id, title, answer) =>
    dispatch(startNumericQuestionEditing(id, title, answer)),
  initQuestionFormInputs: (id, title, answers) =>
    dispatch(startQuestionEditing(id, title, answers)),
});

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    startQuestionEditing: (question) => {
      if (question.question_type === 'number') {
        dispatchProps.initNumericQuestionEditingForm(
          question.id,
          question.title,
          question.answer
        );

        dispatchProps.showModalDialog(
          'Edit question',
          null,
          '',
          <NumericQuestionFormContainer editMode />
        );
      } else {
        dispatchProps.showModalDialog(
          'Edit question',
          null,
          '',
          <QuestionFormContainer
            questionType={question.question_type}
            editMode
          />
        );

        dispatchProps.initQuestionFormInputs(
          question.id,
          question.title,
          question.answers
        );
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuestionList);
