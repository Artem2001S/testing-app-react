import instance from './instance';

export async function sendDeleteQuestionRequest(questionId) {
  await instance.delete(`/questions/${questionId}`);
}

export async function sendAddQuestionRequest(data) {
  const response = await instance.post(
    `/tests/${data.testId}/questions`,
    data.data
  );

  return response.data;
}
