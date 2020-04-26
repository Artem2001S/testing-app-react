import { takeEvery, call, put } from 'redux-saga/effects';
import { REQUEST_TO_ADD_ANSWER } from 'redux/actions/actionTypes';
import { addAnswerSuccess, getError } from 'redux/actions/actionCreators';
import { sendAddAnswerRequest } from 'redux/api/answerOperations';

export function* watchAnswer() {
  yield takeEvery(REQUEST_TO_ADD_ANSWER, answerAddWorker);
}

function* answerAddWorker({ payload }) {
  try {
    const { questionId, text, isRight } = payload;
    const answer = yield call(sendAddAnswerRequest, questionId, text, isRight);

    yield put(addAnswerSuccess(questionId, answer));
  } catch (error) {
    yield put(getError(error.message));
  }
}
