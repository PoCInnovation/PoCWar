import { server } from './server';
import Cookies from 'js-cookie';
import axios from 'axios';

export async function signin(email, password) {
  let err = null;
  await axios.post(server + '/login', {email: email, password: password})
    .then((response) => {
      Cookies.set('user', {token: response.data.access_token, email: email});
    }).catch((e) => {
      console.log(e);
      err = e
    })
  return (err);
}
