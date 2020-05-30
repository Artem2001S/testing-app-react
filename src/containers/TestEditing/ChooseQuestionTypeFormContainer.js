import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import ChooseQuestionTypeForm from 'components/ChooseQuestionTypeForm/ChooseQuestionTypeForm';
import {
  changeAddFormQuestionType,
  openModalDialog,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';
import { getSelectedQuestionType } from 'redux/selectors/test';
import { useAction } from 'hooks/useAction';

export default function ChooseQuestionTypeFormContainer() {
  const selectedQuestionType = useSelector(getSelectedQuestionType);

  const changeAddFormQuestionTypeAction = useAction(changeAddFormQuestionType);
  const showModalDialog = useAction(openModalDialog);

  const handleAddClick = useCallback(() => {
    let node = null;

    if (selectedQuestionType === 'number') {
      node = <NumericQuestionFormContainer />;
    } else {
      node = <QuestionFormContainer questionType={selectedQuestionType} />;
    }

    showModalDialog('Add question', null, 'Add', node);
  }, [selectedQuestionType, showModalDialog]);

  return (
    <ChooseQuestionTypeForm
      questionTypes={['single', 'multiple', 'number']}
      current={selectedQuestionType}
      onChangeQuestionType={changeAddFormQuestionTypeAction}
      onAddClick={handleAddClick}
    />
  );
}
