import { http } from '../utils/server';
import Cookies from 'js-cookie';

export async function signin(email, password) {
  return http.post('/login', { email, password })
    .then((response) => {
      Cookies.set('user', { token: response.data.access_token, email });
    })
}

export async function register(email, password, confirmPassword, name) {
  if (password !== confirmPassword) {
    throw Error('Different passwords');
  }
  return http.post('/register', { email, password, name });
}
