import instance from './instance';

export async function sendDeleteQuestionRequest(questionId) {
  await instance.delete(`/questions/${questionId}`);
}

export async function sendAddQuestionRequest(
  testId,
  title,
  questionType,
  answer
) {
  const response = await instance.post(`/tests/${testId}/questions`, {
    title,
    question_type: questionType,
    answer,
  });

  return response.data;
}

export async function sendPatchQuestionRequest(questionId, data) {
  const response = await instance.patch(`/questions/${questionId}`, data);

  return response.data;
}
