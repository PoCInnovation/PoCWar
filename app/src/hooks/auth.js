import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { http } from '../utils/server';

export async function signin(email, password) {
  return http.post('/login', { email, password })
    .then((response) => {
      const { password: pass, ...decodedToken } = jwtDecode(response.data.access_token);
      Cookies.set('user', { token: response.data.access_token, infos: decodedToken });
    });
}

export async function register(email, password, name) {
  return http.post('/register', { email, password, name })
    .then(() => signin(email, password));
}
