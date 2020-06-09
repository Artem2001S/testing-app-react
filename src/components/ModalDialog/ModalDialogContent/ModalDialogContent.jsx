import React from 'react';
import PropTypes from 'prop-types';
import classes from './ModalDialogContent.module.scss';

export default function ModalDialogContent({
  header,
  children,
  onBackgroundClick,
  onClose,
}) {
  return (
    <div className={classes.ModalDialog} onClick={onBackgroundClick}>
      <div className={classes.ModalDialogContent}>
        <div className={classes.ModalHeader}>
          <span className={classes.Title}>{header}</span>
          <button className={classes.CloseBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        {children && (
          <div className={classes.ModalDialogChildren}>{children}</div>
        )}
        {/* <div className={classes.ModalFooter}>
          {onSuccessBtnClick && successBtnText && (
            <Button handleClick={onSuccessBtnClick}>
              {successBtnText || 'OK'}
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
}

ModalDialogContent.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onBackgroundClick: PropTypes.func,
};
