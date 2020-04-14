import { CHANGE_SEARCH_TEST_FORM_VALUE } from 'redux/actions/actionTypes';
import { updateInputsArray } from 'utils';

const initialState = {
  label: 'Search',
  name: 'search_tests',
  value: '',
};

export default function searchTestFormReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case CHANGE_SEARCH_TEST_FORM_VALUE:
      return {
        ...state,
        value: payload.newValue,
      };
    default:
      return state;
  }
}
