import { takeEvery, call, put } from 'redux-saga/effects';
import {
  REQUEST_TO_DELETE_QUESTION,
  REQUEST_TO_ADD_QUESTION,
  REQUEST_TO_EDIT_QUESTION,
} from 'redux/actions/actionTypes';
import {
  startApiRequest,
  finishApiRequest,
  getError,
  deleteQuestionSuccess,
  addQuestionSuccess,
  editQuestionSuccess,
  sendRequestToAddAnswer,
  deleteAnswerSuccess,
  moveAnswerSuccess,
  editAnswerSuccess,
  addAnswerSuccess,
} from 'redux/actions/actionCreators';
import {
  sendDeleteQuestionRequest,
  sendAddQuestionRequest,
  sendPatchQuestionRequest,
} from 'redux/api/questionOperations';
import {
  sendDeleteAnswerRequest,
  sendAddAnswerRequest,
  sendPatchAnswerRequest,
  sendMoveAnswerRequest,
} from 'redux/api/answerOperations';

export function* watchQuestion() {
  yield takeEvery(REQUEST_TO_DELETE_QUESTION, questionDeleteWorker);
  yield takeEvery(REQUEST_TO_ADD_QUESTION, questionAddWorker);
  yield takeEvery(REQUEST_TO_EDIT_QUESTION, questionEditWorker);
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
    const question = yield call(
      sendAddQuestionRequest,
      payload.testId,
      payload.data.title,
      payload.data.question_type,
      payload.data.answer
    );

    yield put(addQuestionSuccess(question));

    if (payload.data.question_type !== 'number') {
      const answers = payload.data.answers;

      // send requests for add answers
      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        yield put(
          sendRequestToAddAnswer(question.id, answer.text, answer.isRight)
        );
      }
    }
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}

export function* questionEditWorker({ payload }) {
  try {
    yield put(startApiRequest());

    const question = yield call(
      sendPatchQuestionRequest,
      payload.questionId,
      payload.data.title,
      payload.data.answer,
      payload.data.questionType
    );
    yield put(editQuestionSuccess(question));

    if (payload.data.answers) {
      const { answers } = payload.data;

      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        // if not new answer and marked as deleted then send request for delete answer
        if (!answer.isNew && answer.needToDelete) {
          yield call(sendDeleteAnswerRequest, answer.id);
          answers.splice(index, 1);
          yield put(deleteAnswerSuccess(payload.questionId, answer.id));
        }
      }

      // then add new answers
      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        // if marked as new then add
        if (answer.isNew) {
          const createdAnswer = yield call(
            sendAddAnswerRequest,
            payload.questionId,
            answer.text,
            answer.isRight
          );
          answer.id = createdAnswer.id;
          yield put(addAnswerSuccess(payload.questionId, createdAnswer));
        }
      }

      // change answer info
      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        // if some param changed then send request for update
        if (
          (answer.isRight !== answer.initialIsRight ||
            answer.text !== answer.initialValue) &&
          !answer.isNew
        ) {
          const updatedAnswer = yield call(
            sendPatchAnswerRequest,
            answer.id,
            answer.text,
            answer.isRight
          );
          yield put(editAnswerSuccess(updatedAnswer));
        }
      }

      // move answer
      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];

        if (answer.movedTo) {
          yield call(sendMoveAnswerRequest, answer.id, answer.movedTo);
          yield put(
            moveAnswerSuccess(payload.questionId, answer.id, answer.movedTo)
          );
        }
      }
    }
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
