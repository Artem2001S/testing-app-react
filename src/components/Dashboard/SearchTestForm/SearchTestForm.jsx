import React from 'react';
import { useSelector } from 'react-redux';
import {
  changeSearchTestFormInputValue,
  requestTestsFromServer,
} from 'redux/actions/actionCreators';
import { useAction } from 'hooks/useAction';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import classes from './SearchTestForm.module.scss';

function SearchTestForm() {
  const input = useSelector((state) => state.searchTestForm);
  const currentPage = useSelector((state) => state.tests.currentPage);

  const changeInputValue = useAction(changeSearchTestFormInputValue);
  const onSearch = useAction(requestTestsFromServer);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(currentPage, input.value);
  };

  const onInputChange = (e) => changeInputValue(e.target.value);

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
