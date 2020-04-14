import { connect } from 'react-redux';
import { changeSearchTestFormInputValue } from 'redux/actions/actionCreators';
import TextInput from 'components/TextInput/TextInput';

const mapStateToProps = (state) => ({
  label: 'Search',
  value: state.searchTestForm.value,
  name: state.searchTestForm.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (e) => dispatch(changeSearchTestFormInputValue(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
