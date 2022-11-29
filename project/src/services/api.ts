import axios from 'axios';

export const createAPI = () => axios.create({
  baseURL: 'https://10.react.pages.academy/wtw',
  timeout: 5000,
});
