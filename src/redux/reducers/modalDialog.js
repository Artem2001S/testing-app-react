import {
  OPEN_MODAL_DIALOG,
  CLOSE_MODAL_DIALOG,
} from 'redux/actions/actionTypes';

const initialState = {
  isOpen: false,
  title: '',
  successBtnClickHandler: undefined,
  children: null,
};

export default function modalDialogReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case OPEN_MODAL_DIALOG:
      const {
        title,
        successBtnClickHandler,
        children,
        primaryButtonText,
      } = payload;

      return {
        ...state,
        isOpen: true,
        title,
        successBtnClickHandler,
        children,
        primaryButtonText,
      };
    case CLOSE_MODAL_DIALOG:
      return {
        ...state,
        isOpen: false,
        children: null,
        successBtnClickHandler: undefined,
      };
    default:
      return state;
  }
}
