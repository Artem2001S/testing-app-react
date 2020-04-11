import axios from 'axios';

export default axios.create({
  baseURL: 'https://snp-tests.herokuapp.com/api/v1/',
  timeout: 40000,
  headers: { 'scope-key': 'dcb3bd996156c7ff2d7fab5c401451a4' },
  withCredentials: true,
});
