import { http, getHeaders } from '../utils/server';

export async function submitCode(chall, lang, code) {
  console.log({
    lang,
    code,
    challengeId: chall.id
  });
  return http.post('/code',
    { lang, code, challengeId: chall.id },
    getHeaders()
  )
    .then((response) => {
      console.log(response);
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
}