import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_TESTS_FROM_SERVER } from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  getTests,
} from 'redux/actions/actionCreators';
import { getTestsFromServer } from 'redux/api/testOperations';

export function* watchTest() {
  yield takeEvery(REQUEST_TESTS_FROM_SERVER, getTestsWorker);
}

function* getTestsWorker() {
  try {
    yield put(startApiRequest());
    const tests = yield call(getTestsFromServer);

    yield put(getTests(tests));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
