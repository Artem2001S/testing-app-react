import { GET_TESTS, DELETE_TEST } from 'redux/actions/actionTypes';

const initialState = {
  entities: {
    answers: {},
    questions: {},
    tests: {},
  },
  result: [],
};

export default function testsReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_TESTS:
      return payload;
    case DELETE_TEST:
      const newState = { ...state };
      delete newState.entities.tests[payload];
      newState.result = newState.result.filter((testId) => testId !== payload);
      console.log('after delete ', newState);
      return newState;
    default:
      return state;
  }
}
