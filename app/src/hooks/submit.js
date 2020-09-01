import { http, getHeaders } from '../utils/server';

export default async function submitCode(challengeId, lang, code) {
  return http.post('/code', { lang, code, challengeId }, getHeaders())
    .then((response) => response.data);
}