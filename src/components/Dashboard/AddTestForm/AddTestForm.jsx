import React from 'react';
import PropTypes from 'prop-types';
import classes from './AddTestForm.module.scss';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';

export default function AddTestForm({ input, onInputChange, handleSubmit }) {
  return (
    <form className={classes.AddTestForm}>
      <TextInput
        label={input.label}
        value={input.value}
        handleChange={onInputChange}
      />
      <Button handleClick={handleSubmit}>Add test</Button>
    </form>
  );
}

AddTestForm.propTypes = {
  input: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
