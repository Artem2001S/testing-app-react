import {
  OPEN_MODAL_DIALOG,
  CLOSE_MODAL_DIALOG,
} from 'redux/actions/actionTypes';

const initialState = {
  isOpen: false,
  title: '',
};

export default function modalDialogReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case OPEN_MODAL_DIALOG:
      return { ...state, isOpen: true, title: payload.title };
    case CLOSE_MODAL_DIALOG:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
