import axios from 'axios';
import { scopeKey } from 'constants.js';

export default axios.create({
  baseURL: 'https://snp-tests.herokuapp.com/api/v1/',
  timeout: 40000,
  headers: { 'scope-key': scopeKey },
  withCredentials: true,
});
