import React from 'react';
import { connect } from 'react-redux';
import ChooseQuestionTypeForm from 'components/ChooseQuestionTypeForm/ChooseQuestionTypeForm';
import {
  changeAddFormQuestionType,
  openModalDialog,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';

const mapStateToProps = (state) => ({
  testId: state.testEditingPage.result,
  questionTypes: ['single', 'multiple', 'number'],
  current: state.testEditingPage.inputsData.addFormQuestionType,
  inputs: state.numericQuestionForm.inputs,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeQuestionType: (type) => dispatch(changeAddFormQuestionType(type)),
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
});

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    openDialog: () => {
      let node = null;

      if (stateProps.current === 'number') {
        node = <NumericQuestionFormContainer />;
      } else {
        node = <QuestionFormContainer questionType={stateProps.current} />
      }

      dispatchProps.showModalDialog('Add question', null, 'Add', node);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChooseQuestionTypeForm);
