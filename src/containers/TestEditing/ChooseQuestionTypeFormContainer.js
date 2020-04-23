import React from 'react';
import { connect } from 'react-redux';
import ChooseQuestionTypeForm from 'components/ChooseQuestionTypeForm/ChooseQuestionTypeForm';
import {
  changeAddFormQuestionType,
  openModalDialog,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';

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
      let node = '';
      switch (stateProps.current) {
        case 'single':
          node = <div>single form</div>;
          break;
        case 'multiple':
          node = <div>multiple form</div>;
          break;
        case 'number':
          node = <NumericQuestionFormContainer />;
          break;
        default:
          node = <div />;
          break;
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
