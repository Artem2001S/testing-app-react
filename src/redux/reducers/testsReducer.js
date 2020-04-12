import { GET_TESTS } from 'redux/actions/actionTypes';

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
    default:
      return state;
  }
}
