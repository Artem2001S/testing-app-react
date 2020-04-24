import instance from './instance';

export async function sendAddAnswerRequest(questionId, text, isRight) {
  const answer = await instance.post(`questions/${questionId}/answers`, {
    text,
    is_right: isRight,
  });

  return answer.data;
}
