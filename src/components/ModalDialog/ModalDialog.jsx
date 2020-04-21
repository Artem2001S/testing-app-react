import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ModalDialog.module.scss';
import Button from 'components/UIElements/Button/Button';
import { closeModalDialog } from 'redux/actions/actionCreators';

export default function ModalDialog({ title, primaryButtonText }) {
  const dispatch = useDispatch();
  const modalDialogData = useSelector((state) => state.modalDialog);

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
              if (modalDialogData.successBtnClickHandler) {
                modalDialogData.successBtnClickHandler();
              }

              close();
            }}
          >
            {primaryButtonText || 'OK'}
          </Button>
          <Button secondary handleClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
