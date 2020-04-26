import instance from './instance';

export async function sendAddAnswerRequest(questionId, text, isRight) {
  const answer = await instance.post(`/questions/${questionId}/answers`, {
    text,
    is_right: isRight,
  });

  return answer.data;
}

export async function sendDeleteAnswerRequest(answerId) {
  await instance.delete(`/answers/${answerId}`);
}

export async function sendPatchAnswerRequest(answerId, text, isRight) {
  const answer = await instance.patch(`/answers/${answerId}`, {
    text,
    is_right: isRight,
  });

  return answer.data;
}

export async function sendMoveAnswerRequest(answerId, position) {
  await instance.patch(`/answers/${answerId}/insert_at/${position}`);
}
