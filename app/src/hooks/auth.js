import Cookies from 'js-cookie';
import { http } from '../utils/server';

export async function signin(email, password) {
  return http.post('/login', { email, password })
    .then((response) => {
      Cookies.set('user', { token: response.data.access_token, email });
    });
}

export async function register(email, password, name) {
  return http.post('/register', { email, password, name })
    .then(() => signin(email, password));
}
