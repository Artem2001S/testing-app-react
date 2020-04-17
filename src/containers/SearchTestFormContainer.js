import { connect } from 'react-redux';
import {
  changeSearchTestFormInputValue,
  requestTestsFromServer,
} from 'redux/actions/actionCreators';
import Form from 'components/Form/Form';
import { createOnChangeHandlers } from 'utils';

const mapStateToProps = (state) => ({
  inputs: [state.searchTestForm],
  btnText: 'Search',
  currentPage: state.tests.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, inputType, e) =>
    dispatch(changeSearchTestFormInputValue(e.target.value)),
  onSearch: (page, search) => dispatch(requestTestsFromServer(page, search)),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.inputs,
    dispatchProps.handleInputChange
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
    handleFormSubmit: (e) => {
      e.preventDefault();
      dispatchProps.onSearch(
        stateProps.currentPage,
        stateProps.inputs[0].value
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form);
