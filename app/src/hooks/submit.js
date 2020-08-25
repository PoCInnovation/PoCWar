import axios from 'axios';
import { server } from './server';
import Cookies from 'js-cookie';

export async function submitCode(chall, lang, code) {
  const auth = `Bearer ${JSON.parse(Cookies.get('user')).token}`;
  let res = undefined;
  console.log({
    lang: lang,
    code: code,
    challengeId: chall.id,
    Authorization: auth
  });
  await axios.post(server + '/code', {
    lang: lang,
    code: code,
    challengeId: chall.id
  }, {headers: { Authorization: auth}})
  .then((response) => {
    console.log(response);
    res = response.data;
  }).catch((e) => {
    console.log(e);
  });
  return res;
}