import React from 'react';
import classes from './ModalDialog.module.scss';
import Button from 'components/Button/Button';

export default function ModalDialog({
  title,
  children,
  primaryButtonText,
  primaryButtonClickHandler,
}) {
  return (
    <div className={classes.ModalDialog}>
      <div className={classes.ModalDialogContent}>
        <div className={classes.ModalHeader}>
          <span>{title}</span>
          <span>&#10006;</span>
        </div>
        <div className={classes.ModalBody}>{children}</div>
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
          <Button>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
