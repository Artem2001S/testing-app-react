import { connect } from 'react-redux';
import AddQuestionForm from 'components/AddQuestionForm/AddQuestionForm';
import { changeAddFormQuestionType } from 'redux/actions/actionCreators';

const mapStateToProps = (state) => ({
  questionTypes: ['single', 'multiple', 'number'],
  current: state.testEditingPage.inputsData.addFormQuestionType,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeQuestionType: (type) => dispatch(changeAddFormQuestionType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);
