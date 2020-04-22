import { connect } from 'react-redux';
import NumericQuestionForm from 'components/NumericQuestionForm/NumericQuestionForm';
import { changeNumericQuestionFormInputValue } from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.numericQuestionForm.inputs,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (inputName, inputType, e) =>
    dispatch(changeNumericQuestionFormInputValue(inputName, e.target.value)),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.inputs,
    dispatchProps.changeInputValue
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NumericQuestionForm);
