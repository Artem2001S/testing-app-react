import {
  CHANGE_AUTH_FORM_INPUT_VALUE,
  CHANGE_AUTH_FORM_VALIDATION_STATUS,
  CHANGE_REGISTRATION_FORM_INPUT_VALUE,
  CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
  START_API_REQUEST,
  FINISH_API_REQUEST,
  SIGN_IN,
  SEND_REGISTRATION_REQUEST,
  SEND_LOGOUT_REQUEST,
  GET_REQUEST_ERROR,
  SEND_AUTHORIZATION_REQUEST,
  OPEN_MODAL_DIALOG,
  CLOSE_MODAL_DIALOG,
  SUCCESS_LOGOUT,
  SEND_GET_CURRENT_USER_REQUEST,
  REQUEST_TESTS_FROM_SERVER,
  GET_TESTS,
  REQUEST_TEST_DELETING,
  CHANGE_TESTS_LIST_SORT_TYPE,
  CHANGE_SEARCH_TEST_FORM_VALUE,
  REQUEST_TO_ADD_TEST,
  ADD_TEST,
  CLEAR_LAST_ADDED_TEST_ID,
  REQUEST_TEST_INFO,
  GET_TEST_INFO,
  CHANGE_IS_AUTHORIZED_STATUS,
  CHANGE_TITLE_INPUT_VALUE,
  REQUEST_TO_UPDATE_TEST,
  REQUEST_TO_DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  CHANGE_ADD_FORM_QUESTION_TYPE,
  CHANGE_NUMERIC_QUESTION_FORM_INPUT_VALUE,
  REQUEST_TO_ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  START_NUMERIC_QUESTION_EDITING,
  REQUEST_TO_EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  CHANGE_QUESTION_FORM_INPUT_VALUE,
  CHANGE_QUESTION_FORM_CHECKBOX_VALUE,
  CHANGE_QUESTION_FORM_ANSWER_POSITION,
  ADD_ANSWER_TO_QUESTION_FORM,
  DELETE_ANSWER_FROM_QUESTION_FORM,
  REQUEST_TO_ADD_ANSWER,
  ADD_ANSWER_SUCCESS,
  START_QUESTION_EDITING,
  DELETE_ANSWER_SUCCESS,
  MOVE_ANSWER_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  CHANGE_ADD_TEST_FORM_INPUT_VALUE,
  REQUEST_TEST_FROM_QUIZ_PAGE,
  GET_TEST_FOR_QUIZ_PAGE,
  NEXT_QUESTION,
  FINISH_QUIZ,
} from './actionTypes';

export function startApiRequest() {
  return {
    type: START_API_REQUEST,
  };
}

export function finishApiRequest() {
  return {
    type: FINISH_API_REQUEST,
  };
}

export function getError(message) {
  return {
    type: GET_REQUEST_ERROR,
    payload: message,
  };
}

export function changeAuthFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_AUTH_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeAuthFormValidationStatus(status) {
  return {
    type: CHANGE_AUTH_FORM_VALIDATION_STATUS,
    payload: { status },
  };
}

export function changeRegistrationFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_REGISTRATION_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeRegistrationFormValidationStatus(status) {
  return {
    type: CHANGE_REGISTRATION_FORM_VALIDATION_STATUS,
    payload: { status },
  };
}

export function signIn(userData) {
  return {
    type: SIGN_IN,
    payload: userData,
  };
}

export function successLogout() {
  return {
    type: SUCCESS_LOGOUT,
  };
}

export function sendLogoutRequest() {
  return {
    type: SEND_LOGOUT_REQUEST,
  };
}

export function sendGetCurrentUserRequest() {
  return {
    type: SEND_GET_CURRENT_USER_REQUEST,
  };
}

export function changeIsAuthorizedStatus(value) {
  return {
    type: CHANGE_IS_AUTHORIZED_STATUS,
    payload: value,
  };
}

export function sendRegistrationRequest(userName, password, isAdmin) {
  return {
    type: SEND_REGISTRATION_REQUEST,
    payload: { username: userName, password, is_admin: isAdmin },
  };
}

export function sendAuthorizationRequest(userName, password) {
  return {
    type: SEND_AUTHORIZATION_REQUEST,
    payload: { username: userName, password },
  };
}

export function openModalDialog(
  title,
  successBtnClickHandler,
  primaryButtonText,
  children
) {
  return {
    type: OPEN_MODAL_DIALOG,
    payload: { title, successBtnClickHandler, children, primaryButtonText },
  };
}

export function closeModalDialog() {
  return {
    type: CLOSE_MODAL_DIALOG,
  };
}

// Tests

export function requestTestsFromServer(page = 1, search = '') {
  return {
    type: REQUEST_TESTS_FROM_SERVER,
    payload: { page, search },
  };
}

export function getTests(tests) {
  return {
    type: GET_TESTS,
    payload: tests,
  };
}

export function requestToAddTest(title) {
  return {
    type: REQUEST_TO_ADD_TEST,
    payload: title,
  };
}

export function changeAddTestFormInputValue(value) {
  return {
    type: CHANGE_ADD_TEST_FORM_INPUT_VALUE,
    payload: value,
  };
}

export function addTest(test) {
  return {
    type: ADD_TEST,
    payload: test,
  };
}

export function clearLastAddedTestId() {
  return {
    type: CLEAR_LAST_ADDED_TEST_ID,
  };
}

export function requestTestDeleting(id) {
  return {
    type: REQUEST_TEST_DELETING,
    payload: id,
  };
}

export function changeTestsListSortType() {
  return {
    type: CHANGE_TESTS_LIST_SORT_TYPE,
  };
}

export function changeSearchTestFormInputValue(newValue) {
  return {
    type: CHANGE_SEARCH_TEST_FORM_VALUE,
    payload: { newValue },
  };
}

// test editing

export function requestTestInfo(id) {
  return {
    type: REQUEST_TEST_INFO,
    payload: id,
  };
}

export function getTestInfo(data) {
  return {
    type: GET_TEST_INFO,
    payload: data,
  };
}

export function changeTitleInputValue(value) {
  return {
    type: CHANGE_TITLE_INPUT_VALUE,
    payload: value,
  };
}

export function changeAddFormQuestionType(type) {
  return {
    type: CHANGE_ADD_FORM_QUESTION_TYPE,
    payload: type,
  };
}

export function sendRequestToUpdateTest(id, data) {
  return {
    type: REQUEST_TO_UPDATE_TEST,
    payload: { id, data },
  };
}

export function sendRequestToDeleteQuestion(id) {
  return {
    type: REQUEST_TO_DELETE_QUESTION,
    payload: id,
  };
}

export function deleteQuestionSuccess(id) {
  return {
    type: DELETE_QUESTION_SUCCESS,
    payload: id,
  };
}

export function changeNumericQuestionFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_NUMERIC_QUESTION_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function sendRequestToAddQuestion(testId, data) {
  return {
    type: REQUEST_TO_ADD_QUESTION,
    payload: { testId, data },
  };
}

export function addQuestionSuccess(data) {
  return {
    type: ADD_QUESTION_SUCCESS,
    payload: data,
  };
}

export function sendRequestToAddAnswer(questionId, text, isRight) {
  return {
    type: REQUEST_TO_ADD_ANSWER,
    payload: { questionId, text, isRight },
  };
}

export function addAnswerSuccess(questionId, answer) {
  return {
    type: ADD_ANSWER_SUCCESS,
    payload: { questionId, answer },
  };
}

export function deleteAnswerSuccess(questionId, answerId) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    payload: { questionId, answerId },
  };
}

export function moveAnswerSuccess(questionId, answerId, position) {
  return {
    type: MOVE_ANSWER_SUCCESS,
    payload: { questionId, position, answerId },
  };
}

export function editAnswerSuccess(answer) {
  return {
    type: EDIT_ANSWER_SUCCESS,
    payload: answer,
  };
}

export function startNumericQuestionEditing(id, title, answer) {
  return {
    type: START_NUMERIC_QUESTION_EDITING,
    payload: { id, title, answer },
  };
}

export function startQuestionEditing(id, title, answers) {
  return {
    type: START_QUESTION_EDITING,
    payload: { id, title, answers },
  };
}

export function sendRequestToEditQuestion(questionId, data) {
  return {
    type: REQUEST_TO_EDIT_QUESTION,
    payload: { questionId, data },
  };
}

export function editQuestionSuccess(question) {
  return {
    type: EDIT_QUESTION_SUCCESS,
    payload: question,
  };
}

export function changeQuestionFormInputValue(inputName, newValue) {
  return {
    type: CHANGE_QUESTION_FORM_INPUT_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeQuestionFormCheckboxValue(inputName, newValue) {
  return {
    type: CHANGE_QUESTION_FORM_CHECKBOX_VALUE,
    payload: { inputName, newValue },
  };
}

export function changeQuestionFormAnswerPosition(from, to) {
  return {
    type: CHANGE_QUESTION_FORM_ANSWER_POSITION,
    payload: { from, to },
  };
}

export function addAnswerToQuestionForm() {
  return { type: ADD_ANSWER_TO_QUESTION_FORM };
}

export function deleteAnswerFromQuestionForm(inputName) {
  return {
    type: DELETE_ANSWER_FROM_QUESTION_FORM,
    payload: { inputName },
  };
}

export function requestTestFromQuizPage(testId) {
  return {
    type: REQUEST_TEST_FROM_QUIZ_PAGE,
    payload: testId,
  };
}

export function getTestForQuizPage(test) {
  return {
    type: GET_TEST_FOR_QUIZ_PAGE,
    payload: test,
  };
}

export function nextQuestion() {
  return {
    type: NEXT_QUESTION,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}
