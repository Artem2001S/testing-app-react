import { takeEvery, call, put } from 'redux-saga/effects';
import { REQUEST_TO_DELETE_QUESTION } from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  deleteQuestionSuccess,
} from 'redux/actions/actionCreators';
import { sendDeleteQuestionRequest } from 'redux/api/questionOperations';

export function* watchQuestion() {
  yield takeEvery(REQUEST_TO_DELETE_QUESTION, questionDeleteWorker);
}

function* questionDeleteWorker({ payload }) {
  try {
    yield put(startApiRequest());
    yield call(sendDeleteQuestionRequest, payload);
    yield put(deleteQuestionSuccess(payload));
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
