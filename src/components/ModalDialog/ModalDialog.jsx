import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { createElement } from 'utils';
import classes from './ModalDialog.module.scss';

const modalRoot = document.getElementById('modal');

function ModalDialog({
  header,
  children,
  successBtnText,
  onSuccessBtnClick,
  onClose,
}) {
  const modalContainer = createElement('div', classes.ModalDialog);
  const modalContent = createElement('div', classes.ModalDialogContent);

  const handleBackgroundClick = useCallback(
    (e) => e.target === e.currentTarget && onClose(),
    [onClose]
  );

  modalContainer.addEventListener('click', handleBackgroundClick);

  const headerContainer = createElement('div', classes.ModalHeader);
  const title = createElement('span', classes.Title, header);
  const closeBtn = createElement('button', classes.CloseBtn, null, '&times;');
  closeBtn.addEventListener('click', onClose);

  headerContainer.appendChild(title);
  headerContainer.appendChild(closeBtn);

  modalContent.appendChild(headerContainer);
  modalContainer.appendChild(modalContent);

  const handleSuccessBtnClick = useCallback(() => {
    onSuccessBtnClick();
    onClose();
  }, [onClose, onSuccessBtnClick]);

  if (successBtnText && onSuccessBtnClick) {
    const btn = createElement('button', classes.Button, successBtnText);
    btn.addEventListener('click', handleSuccessBtnClick);
    modalContent.append(btn);
  }

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    modalRoot.append(modalContainer);
    return () => {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalContainer, modalContent]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.body.style.overflowY = 'hidden';

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflowY = 'initial';
    };
  }, [handleKeyUp]);

  return ReactDOM.createPortal(children, modalContent);
}

export default React.memo(ModalDialog);
