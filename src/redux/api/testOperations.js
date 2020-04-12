import instance from './instance';
import { normalizeTests } from 'redux/normalizr/normalizeTests';

export async function getTestsFromServer() {
  const response = await instance.get('/tests');

  return normalizeTests(response.data.tests);
}
