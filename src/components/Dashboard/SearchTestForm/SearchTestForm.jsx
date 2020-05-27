import React from 'react';
import TextInput from 'components/UIElements/TextInput/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/UIElements/Button/Button';
import classes from './SearchTestForm.module.scss';
import {
  changeSearchTestFormInputValue,
  requestTestsFromServer,
} from 'redux/actions/actionCreators';

function SearchTestForm() {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.searchTestForm);
  const currentPage = useSelector((state) => state.tests.currentPage);

  const onInputChange = (e) =>
    dispatch(changeSearchTestFormInputValue(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestTestsFromServer(currentPage, input.value));
  };

  return (
    <form className={classes.SearchTestForm}>
      <TextInput
        label={input.label}
        value={input.value}
        handleChange={onInputChange}
      />
      <Button handleClick={handleSubmit}>Search</Button>
    </form>
  );
}

export default React.memo(SearchTestForm);
