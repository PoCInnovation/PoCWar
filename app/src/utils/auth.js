import Cookies from 'js-cookie';

export function userIsLoggedIn() {
  return !!Cookies.get('user');
}

export function userIsAdmin() {
  const user = Cookies.get('user');
  if (user) {
    const { role } = JSON.parse(user).infos;
    return role === 'admin';
  }
  return false;
}
