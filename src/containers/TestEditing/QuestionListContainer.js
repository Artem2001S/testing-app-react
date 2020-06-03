import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import List from 'components/List/List';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getCurrentTestQuestions } from 'redux/selectors/test';
import {
  sendRequestToDeleteQuestion,
  openModalDialog,
  startNumericQuestionEditing,
  startQuestionEditing,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';
import { useAction } from 'hooks/useAction';

export default function QuestionList() {
  const questions = useSelector(getCurrentTestQuestions);

  const deleteQuestionAction = useAction(sendRequestToDeleteQuestion);
  const showModal = useAction(openModalDialog);

  const handleQuestionDeleting = useCallback(
    (id) => {
      showModal('Delete question ?', () => deleteQuestionAction(id));
    },
    [deleteQuestionAction, showModal]
  );

  const initNumericQuestionEditingForm = useAction(startNumericQuestionEditing);
  const initQuestionFormInputs = useAction(startQuestionEditing);

  const handleStartQuestionEditing = useCallback(
    (question) => {
      if (question.question_type === 'number') {
        initNumericQuestionEditingForm(
          question.id,
          question.title,
          question.answer
        );

        showModal(
          'Edit question',
          null,
          '',
          <NumericQuestionFormContainer editMode />
        );
      } else {
        showModal(
          'Edit question',
          null,
          '',
          <QuestionFormContainer
            questionType={question.question_type}
            editMode
          />
        );

        initQuestionFormInputs(question.id, question.title, question.answers);
      }
    },
    [initNumericQuestionEditingForm, initQuestionFormInputs, showModal]
  );

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
            startQuestionEditing={handleStartQuestionEditing.bind(
              this,
              question
            )}
            onDelete={handleQuestionDeleting.bind(this, question.id)}
          />
        ))
      )}
    </List>
  );
}
