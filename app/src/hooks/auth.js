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

export async function register(email, password, confirmPassword, name) {
  if (password !== confirmPassword) {
    return 'Different passwords';
  }
  let err = null;
  await axios.post(server + '/register', {email: email, password: password, name: name})
    .then((response) => {
    }).catch((e) => {
      console.log(e);
      err = e
    })
  return (err);
}
