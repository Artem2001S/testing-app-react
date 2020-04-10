import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import classes from './Form.module.scss';
import { Link, Redirect } from 'react-router-dom';
import Checkbox from 'components/Checkbox/Checkbox';
import Loader from 'components/Loader/Loader';
import ModalDialog from 'components/ModalDialog/ModalDialog';

export default function Form({
  inputs,
  btnText,
  isAuthorized,
  additionalLinks,
  validationErrors,
  requestErrors,
  inputChangeHandlers,
  handleFormSubmit,
}) {
  const store = useStore().getState();
  const isLoading = store.UIData.isLoading;

  return (
    <>
      <ModalDialog title="Wouto logout ?Wouto logout ?Wouto logout ?Wouto logout ?Wouto logout ?" primaryButtonText="Yes" />
      {isLoading && <Loader />}
      {isAuthorized && <Redirect to="/dashboard" />}
      <form className={classes.Form} onSubmit={handleFormSubmit}>
        {inputs.map((input, index) => {
          if (!input.type) input.type = 'text';

          if (input.type === 'checkbox') {
            return (
              <Checkbox
                key={`${input.name}${index}`}
                {...input}
                handleChange={inputChangeHandlers[input.name]}
              />
            );
          }

          return (
            <TextInput
              key={`${input.name}${index}`}
              {...input}
              handleChange={inputChangeHandlers[input.name]}
            />
          );
        })}
        <Button handleClick={handleFormSubmit}>{btnText}</Button>

        {additionalLinks &&
          additionalLinks.map((link) => (
            <Link key={link.to} className={classes.Link} to={link.to}>
              {link.label}
            </Link>
          ))}
        {validationErrors && (
          <div className={classes.Error}>{validationErrors}</div>
        )}
        {requestErrors && <div className={classes.Error}>{requestErrors}</div>}
      </form>
    </>
  );
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired,
  btnText: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool,
  requestErrors: PropTypes.string,
  validationErrors: PropTypes.string,
  additionalLinks: PropTypes.array,
  inputChangeHandlers: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
