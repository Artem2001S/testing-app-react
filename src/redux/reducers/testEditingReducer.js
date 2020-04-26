import {
  GET_TEST_INFO,
  CHANGE_TITLE_INPUT_VALUE,
  DELETE_QUESTION_SUCCESS,
  CHANGE_ADD_FORM_QUESTION_TYPE,
  ADD_QUESTION_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  ADD_ANSWER_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  MOVE_ANSWER_SUCCESS,
} from 'redux/actions/actionTypes';

const initialState = {
  entities: {
    answers: {},
    questions: {},
    tests: {},
  },
  result: -1,
  inputsData: {
    titleEditing: { label: 'Title', name: 'test_title', value: '' },
    addFormQuestionType: 'single',
  },
};

export default function testEditingPageReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case GET_TEST_INFO:
      const testTitle = payload.entities.tests[payload.result].title;

      return {
        ...state,
        ...payload,
        inputsData: {
          ...state.inputsData,
          titleEditing: { ...state.inputsData.titleEditing, value: testTitle },
        },
      };
    case DELETE_QUESTION_SUCCESS:
      const newEntities = { ...state.entities };
      delete newEntities.questions[payload];

      // delete question reference
      newEntities.tests[state.result].questions = newEntities.tests[
        state.result
      ].questions.filter((questionId) => questionId !== payload);

      return { ...state, entities: newEntities };
    case ADD_QUESTION_SUCCESS:
      const test = { ...state.entities.tests[state.result] };

      return {
        ...state,
        entities: {
          ...state.entities,
          tests: {
            [state.result]: {
              ...test,
              questions: [...test.questions, payload.id],
            },
          },
          questions: {
            ...state.entities.questions,
            [payload.id]: payload,
          },
        },
      };
    case ADD_ANSWER_SUCCESS:
      const question = state.entities.questions[payload.questionId];

      return {
        ...state,
        entities: {
          ...state.entities,
          answers: {
            ...state.entities.answers,
            [payload.answer.id]: payload.answer,
          },
          questions: {
            ...state.entities.questions,
            [payload.questionId]: {
              ...question,
              answers: [...question.answers, payload.answer.id],
            },
          },
        },
      };
    case MOVE_ANSWER_SUCCESS:
      const questionAnswers =
        state.entities.questions[payload.questionId].answers;

      const index = questionAnswers.findIndex(
        (answerId) => payload.answerId === answerId
      );

      questionAnswers.splice(index, 1);
      questionAnswers.splice(payload.position, 0, payload.answerId);

      return { ...state };
    case EDIT_ANSWER_SUCCESS:
      state.entities.answers[payload.id] = payload;
      return { ...state };
    case DELETE_ANSWER_SUCCESS:
      delete state.entities.answers[payload.answerId];
      return {
        ...state,
        entities: {
          ...state.entities,
          questions: {
            ...state.entities.questions,
            [payload.questionId]: {
              ...state.entities.questions[payload.questionId],
              answers: state.entities.questions[
                payload.questionId
              ].answers.filter((answerId) => answerId !== payload.answerId),
            },
          },
        },
      };
    case EDIT_QUESTION_SUCCESS:
      const updatedQuestion = {
        ...state.entities.questions[payload.id],
        title: payload.title,
        answer: payload.answer || null,
      };

      return {
        ...state,
        entities: {
          ...state.entities,
          questions: {
            ...state.entities.questions,
            [payload.id]: updatedQuestion,
          },
        },
      };
    case CHANGE_TITLE_INPUT_VALUE:
      return {
        ...state,
        inputsData: {
          ...state.inputsData,
          titleEditing: { ...state.inputsData.titleEditing, value: payload },
        },
      };
    case CHANGE_ADD_FORM_QUESTION_TYPE:
      return {
        ...state,
        inputsData: {
          ...state.inputsData,
          addFormQuestionType: payload,
        },
      };
    default:
      return state;
  }
}
