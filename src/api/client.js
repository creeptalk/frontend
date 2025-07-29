// src/api/client.js

import axios from 'axios';

console.log('✅ API BASE URL:', process.env.REACT_APP_API_BASE);


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE, // .env 값을 그대로 사용
  timeout: 15000,
});

// ✨ 응답 코드가 400, 500이어도 catch 안에서 내용을 볼 수 있도록
api.interceptors.response.use(
  res => res,
  err => Promise.reject(err.response ?? err)   // err.response가 없으면 네트워크 오류
);

export default api;
