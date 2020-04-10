import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './ModalDialog.module.scss';
import Button from 'components/Button/Button';
import { closeModalDialog } from 'redux/actions/actionCreators';

export default function ModalDialog({
  title,
  primaryButtonText,
  primaryButtonClickHandler,
}) {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModalDialog());
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <div
      className={classes.ModalDialog}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className={classes.ModalDialogContent}>
        <div className={classes.ModalHeader}>
          <span className={classes.Title}>{title}</span>
          <button className={classes.CloseBtn} onClick={close}>
            &times;
          </button>
        </div>
        <div className={classes.ModalFooter}>
          <Button
            handleClick={() => {
              primaryButtonClickHandler();
              close();
            }}
          >
            {primaryButtonText}
          </Button>
          <Button secondary handleClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
