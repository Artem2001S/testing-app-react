import { takeEvery, put, call } from 'redux-saga/effects';
import { SEND_REGISTRATION_REQUEST } from 'redux/actions/actionTypes';
import { signUpRequest } from 'redux/api/userOperations';
import {
  startApiRequest,
  finishApiRequest,
  signIn,
  getError,
} from 'redux/actions/actionCreators';

export function* watchUser() {
  yield takeEvery(SEND_REGISTRATION_REQUEST, registrationWorker);
}

function* registrationWorker({ payload }) {
  const { username, password, is_admin } = payload;

  try {
    yield put(startApiRequest());
    const data = yield call(signUpRequest, username, password, is_admin);

    yield put(finishApiRequest());

    if (data.isSuccess) {
      yield put(signIn(data.user));
    } else {
      yield put(getError(data.errorMessage));
    }
  } catch (error) {
    yield put(getError(error.message));
  }
}
