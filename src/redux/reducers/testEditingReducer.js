import { GET_TEST_INFO } from 'redux/actions/actionTypes';

const initialState = {
  entities: {
    answers: {},
    questions: {},
    tests: {},
  },
  result: -1,
};

export default function testEditingPageReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case GET_TEST_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
}
