import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAction } from 'hooks/useAction';
import classes from './ModalDialog.module.scss';
import Button from 'components/UIElements/Button/Button';
import { closeModalDialog } from 'redux/actions/actionCreators';
import { useCallback } from 'react';

export default function ModalDialog({
  title,
  primaryButtonText,
  children,
  successBtnClickHandler,
}) {
  const close = useAction(closeModalDialog);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  const handleOKButtonClick = useCallback(() => {
    if (successBtnClickHandler) {
      successBtnClickHandler();
    }

    close();
  }, [close, successBtnClickHandler]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflowY = 'initial';
    };
  }, [handleKeyUp]);

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

        {children && (
          <div className={classes.ModalDialogChildren}>{children}</div>
        )}

        <div className={classes.ModalFooter}>
          {successBtnClickHandler && (
            <Button onClick={handleOKButtonClick}>
              {primaryButtonText || 'OK'}
            </Button>
          )}

          <Button secondary onClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

ModalDialog.propTypes = {
  title: PropTypes.string,
  primaryButtonText: PropTypes.string,
  children: PropTypes.node,
  successBtnClickHandler: PropTypes.func,
};
