import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_TESTS_FROM_SERVER,
  REQUEST_TEST_DELETING,
} from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  getTests,
  deleteTest,
} from 'redux/actions/actionCreators';
import {
  getTestsFromServer,
  sendDeleteTestRequest,
} from 'redux/api/testOperations';

export function* watchTest() {
  yield takeEvery(REQUEST_TESTS_FROM_SERVER, getTestsWorker);
  yield takeEvery(REQUEST_TEST_DELETING, deleteTestWorker);
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

export function* deleteTestWorker({ payload }) {
  try {
    yield put(startApiRequest());
    yield call(sendDeleteTestRequest, payload);
    yield put(deleteTest(payload));
  } catch (error) {
    yield put(error.message);
  }

  yield put(finishApiRequest());
}
