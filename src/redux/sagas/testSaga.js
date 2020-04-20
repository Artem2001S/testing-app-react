import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_TESTS_FROM_SERVER,
  REQUEST_TEST_DELETING,
  REQUEST_TO_ADD_TEST,
  REQUEST_TEST_INFO,
  REQUEST_TO_UPDATE_TEST,
} from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  getTests,
  getTestInfo,
  deleteTest,
  addTest,
} from 'redux/actions/actionCreators';
import {
  getTestsFromServer,
  sendDeleteTestRequest,
  sendRequestToAddTest,
  sendRequestToGetTest,
  sendRequestToUpdateTest,
} from 'redux/api/testOperations';

export function* watchTest() {
  yield takeEvery(REQUEST_TESTS_FROM_SERVER, getTestsWorker);
  yield takeEvery(REQUEST_TEST_DELETING, deleteTestWorker);
  yield takeEvery(REQUEST_TO_ADD_TEST, addTestWorker);
  yield takeEvery(REQUEST_TEST_INFO, getTestWorker);
  yield takeEvery(REQUEST_TO_UPDATE_TEST, updateTestWorker);
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

function* getTestWorker({ payload }) {
  try {
    yield put(startApiRequest());
    const test = yield call(sendRequestToGetTest, payload);
    yield put(getTestInfo(test));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}

function* updateTestWorker({ payload }) {
  try {
    yield put(startApiRequest());
    const updatedTest = yield call(
      sendRequestToUpdateTest,
      payload.id,
      payload.data
    );

    yield put(getTestInfo(updatedTest));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
