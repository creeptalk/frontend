// src/api/client.js

import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const fromEnv = process.env.REACT_APP_API_BASE;
const baseURL = isProd ? '/api' : (fromEnv || '/api');
console.log('✅ API BASE URL (effective):', baseURL);

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// ✨ 응답 코드가 400, 500이어도 catch 안에서 내용을 볼 수 있도록
api.interceptors.response.use(
  res => res,
  err => Promise.reject(err.response ?? err)   // err.response가 없으면 네트워크 오류
);

// 🔎 실제로 호출되는 풀 URL 로깅 (임시로 확인용; 해결되면 제거해도 됨)
api.interceptors.request.use((config) => {
  try {
    const fullUrl = new URL(config.url || '', baseURL || window.location.origin).href;
    console.log('➡️ Axios request:', fullUrl);
  } catch {}
  return config;
});



export default api;
