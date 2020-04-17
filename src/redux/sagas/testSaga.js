import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_TESTS_FROM_SERVER,
  REQUEST_TEST_DELETING,
  REQUEST_TO_ADD_TEST,
} from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  getTests,
  deleteTest,
  addTest,
} from 'redux/actions/actionCreators';
import {
  getTestsFromServer,
  sendDeleteTestRequest,
  sendRequestToAddTest,
} from 'redux/api/testOperations';

export function* watchTest() {
  yield takeEvery(REQUEST_TESTS_FROM_SERVER, getTestsWorker);
  yield takeEvery(REQUEST_TEST_DELETING, deleteTestWorker);
  yield takeEvery(REQUEST_TO_ADD_TEST, addTestWorker);
}

function* getTestsWorker({ payload }) {
  try {
    yield put(startApiRequest());

    const tests = yield call(getTestsFromServer, payload);

    yield put(getTests(tests));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}

function* deleteTestWorker({ payload }) {
  try {
    yield put(startApiRequest());
    yield call(sendDeleteTestRequest, payload);
    yield put(deleteTest(payload));
  } catch (error) {
    yield put(error.message);
  }

  yield put(finishApiRequest());
}

function* addTestWorker({ payload }) {
  try {
    yield put(startApiRequest());
    const test = yield call(sendRequestToAddTest, payload);
    yield put(addTest(test));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
