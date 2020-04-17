import instance from './instance';
import { normalizeTests } from 'redux/normalizr/normalizeTests';
import { convertTestObject } from 'utils';

export async function getTestsFromServer({ page, search }) {
  let response = await instance.get('/tests', { params: { page, search } });

  // if no tests are found on the searching page then search tests in first page
  if (response.data.tests.length === 0 && page !== 1) {
    page = 1;
    response = await instance.get('/tests', { params: { page, search } });
  }

  const tests = response.data.tests.map((test) => convertTestObject(test));

  const meta = {
    currentPage: page,
    totalPages: response.data.meta.total_pages,
  };

  return { tests: normalizeTests(tests), ...meta };
}

export async function sendDeleteTestRequest(id) {
  await instance.delete(`/tests/${id}`);
  return { isSuccess: true };
}

export async function sendRequestToAddTest(title) {
  const createdTest = await instance.post('/tests', { title });
  return convertTestObject(createdTest.data);
}
