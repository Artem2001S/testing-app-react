import { takeEvery, put, call } from 'redux-saga/effects';
import {
  SEND_REGISTRATION_REQUEST,
  SEND_AUTHORIZATION_REQUEST,
  SEND_LOGOUT_REQUEST,
} from 'redux/actions/actionTypes';
import {
  signUpRequest,
  signInRequest,
  logoutRequest,
} from 'redux/api/userOperations';
import {
  startApiRequest,
  finishApiRequest,
  signIn,
  getError,
  successLogout,
} from 'redux/actions/actionCreators';

export function* watchUser() {
  yield takeEvery(SEND_REGISTRATION_REQUEST, registrationWorker);
  yield takeEvery(SEND_AUTHORIZATION_REQUEST, authorizationWorker);
  yield takeEvery(SEND_LOGOUT_REQUEST, logoutWorker);
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

  yield put(finishApiRequest());
}

function* authorizationWorker({ payload }) {
  const { username, password } = payload;

  try {
    yield put(startApiRequest());
    const data = yield call(signInRequest, username, password);

    if (data.isSuccess) {
      yield put(signIn(data.user));
    } else {
      yield put(getError(data.errorMessage));
    }
  } catch (error) {
    yield put(getError(error.message));
  }
  yield put(finishApiRequest());
}

function* logoutWorker() {
  try {
    yield put(startApiRequest());
    const result = yield call(logoutRequest);

    if (result.isSuccess) {
      yield put(successLogout());
    }
  } catch (error) {
    yield put(getError(error.message));
  }

  yield put(finishApiRequest());
}
