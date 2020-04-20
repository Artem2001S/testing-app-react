import instance from './instance';

export async function sendDeleteQuestionRequest(questionId) {
  await instance.delete(`/questions/${questionId}`);
}
