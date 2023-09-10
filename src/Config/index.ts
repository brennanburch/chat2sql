import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://chat2sql-server.onrender.com/api',
  //baseURL: 'http://localhost:3000/api',
  timeout: 200000,
  // headers: { 'X-Custom-Header': 'foobar' },
});
