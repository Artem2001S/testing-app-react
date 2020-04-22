import { takeEvery, call, put } from 'redux-saga/effects';
import {
  REQUEST_TO_DELETE_QUESTION,
  REQUEST_TO_ADD_QUESTION,
} from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  deleteQuestionSuccess,
  addQuestionSuccess,
} from 'redux/actions/actionCreators';
import {
  sendDeleteQuestionRequest,
  sendAddQuestionRequest,
} from 'redux/api/questionOperations';

export function* watchQuestion() {
  yield takeEvery(REQUEST_TO_DELETE_QUESTION, questionDeleteWorker);
  yield takeEvery(REQUEST_TO_ADD_QUESTION, questionAddWorker);
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

export function* questionAddWorker({ payload }) {
  try {
    yield put(startApiRequest());
    const question = yield call(sendAddQuestionRequest, payload);
    console.log(question);

    yield put(addQuestionSuccess(question));
  } catch (error) {
    console.log(error.response.data);
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
