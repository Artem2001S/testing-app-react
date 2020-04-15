import {
  GET_TESTS,
  DELETE_TEST,
  CHANGE_TESTS_LIST_SORT_TYPE,
  ADD_TEST,
} from 'redux/actions/actionTypes';
import { sortTypes } from 'constants.js';

const initialState = {
  data: {
    entities: {
      answers: {},
      questions: {},
      tests: {},
    },
    result: [],
  },
  sortType: sortTypes.descending,
};

export default function testsReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TESTS:
      return { ...state, data: payload };
    case ADD_TEST:
      return {
        ...state,
        data: {
          entities: {
            ...state.data.entities,
            tests: { ...state.data.entities.tests, [payload.id]: payload },
          },
          result: [...state.data.result, payload.id],
        },
      };
    case DELETE_TEST:
      const newData = { ...state.data };
      delete newData.entities.tests[payload];
      newData.result = newData.result.filter((testId) => testId !== payload);
      return { ...state, data: newData };
    case CHANGE_TESTS_LIST_SORT_TYPE:
      return {
        ...state,
        sortType:
          state.sortType === sortTypes.descending
            ? sortTypes.ascending
            : sortTypes.descending,
      };
    default:
      return state;
  }
}
