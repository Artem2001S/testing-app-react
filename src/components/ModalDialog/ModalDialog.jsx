import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalDialogContent from './ModalDialogContent/ModalDialogContent';

const modalRoot = document.getElementById('modal');

function ModalDialog({ header, children, onClose }) {
  const handleBackgroundClick = useCallback(
    (e) => e.target === e.currentTarget && onClose(),
    [onClose]
  );

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflowY = 'initial';
    };
  }, [handleKeyUp]);

  return ReactDOM.createPortal(
    <ModalDialogContent
      header={header}
      onClose={onClose}
      onBackgroundClick={handleBackgroundClick}
    >
      {children}
    </ModalDialogContent>,
    modalRoot
  );
}

export default React.memo(ModalDialog);
