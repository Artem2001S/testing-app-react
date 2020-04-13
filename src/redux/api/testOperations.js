import instance from './instance';
import { normalizeTests } from 'redux/normalizr/normalizeTests';

export async function getTestsFromServer() {
  const response = await instance.get('/tests');

  const tests = response.data.tests.map((test) => {
    const convertedTest = {
      ...test,
      createdAt: new Date(test.created_at).toLocaleString(),
      createdAtValue: new Date(test.created_at).valueOf(),
    };

    delete convertedTest.created_at;
    return convertedTest;
  });

  return normalizeTests(tests);
}
