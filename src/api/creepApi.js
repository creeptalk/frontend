// src/api/creepApi.js
import api from './client';

/**
 * GPT‑RAG 서버에 질의
 * @param {string} queryText
 * @returns {Promise<string>}  서버가 돌려준 순수 문자열
 */
export async function sendQuery(queryText) {
  const { data } = await api.post('/test-query', {
    query: queryText,
    translate: true,
  });

  // /test-query는 문자열만 돌려준다
  return data;
}
