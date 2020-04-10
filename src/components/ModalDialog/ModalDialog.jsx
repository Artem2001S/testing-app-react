import React from 'react';
import classes from './ModalDialog.module.scss';
import Button from 'components/Button/Button';

export default function ModalDialog({
  title,
  primaryButtonText,
  primaryButtonClickHandler,
}) {
  return (
    <div className={classes.ModalDialog}>
      <div className={classes.ModalDialogContent}>
        <div className={classes.ModalHeader}>
          <span className={classes.Title}>{title}</span>
          <button className={classes.CloseBtn}>&times;</button>
        </div>
        <div className={classes.ModalFooter}>
          <Button
            handelClick={() => {
              // TODO
              // closeModalDialog();
              primaryButtonClickHandler();
            }}
          >
            {primaryButtonText}
          </Button>
          <Button secondary>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
