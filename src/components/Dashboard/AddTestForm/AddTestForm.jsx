import React from 'react';
import PropTypes from 'prop-types';
import classes from './AddTestForm.module.scss';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';

export default function AddTestForm({ input, onInputChange, onFormSubmit }) {
  return (
    <form className={classes.AddTestForm} onSubmit={onFormSubmit}>
      <TextInput
        label={input.label}
        value={input.value}
        onChange={onInputChange}
      />
      <Button onClick={onFormSubmit}>Add test</Button>
    </form>
  );
}

AddTestForm.propTypes = {
  input: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
