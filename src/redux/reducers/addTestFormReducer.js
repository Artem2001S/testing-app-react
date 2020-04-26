import { CHANGE_ADD_TEST_FORM_INPUT_VALUE } from 'redux/actions/actionTypes';

const initialState = {
  input: {
    label: 'Enter test title',
    value: '',
    name: 'test-title',
  },
};

export default function addTestFormReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case CHANGE_ADD_TEST_FORM_INPUT_VALUE:
      return {
        ...state,
        input: {
          ...state,
          value: payload,
        },
      };
    default:
      return state;
  }
}
