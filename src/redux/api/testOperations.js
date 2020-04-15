import instance from './instance';
import { normalizeTests } from 'redux/normalizr/normalizeTests';
import { convertTestObject } from 'utils';

export async function getTestsFromServer() {
  const response = await instance.get('/tests');
  const tests = response.data.tests.map((test) => convertTestObject(test));

  return normalizeTests(tests);
}

export async function sendDeleteTestRequest(id) {
  await instance.delete(`/tests/${id}`);
  return { isSuccess: true };
}

export async function sendRequestToAddTest(title) {
  const createdTest = await instance.post('/tests', { title });
  return convertTestObject(createdTest.data);
}
