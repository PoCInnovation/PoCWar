import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginRoute, homeRoute } from '../consts/routes';


// textTransform: 'none',

export function LoginButton() {
  const history = useHistory();
  const redirectLogin = () => {
    history.push(loginRoute);
  };

  return (
    <Button color='inherit' onClick={redirectLogin}>
      Login
    </Button>
  );
}

export function LogoutButton() {
  const user = JSON.parse(Cookies.get('user'));
  const history = useHistory();
  return (
    <Button
      color='inherit'
      onClick={async () => {
        Cookies.remove('user');
        history.push(homeRoute);
      }}
    >
      {user.email}
    </Button>
  );
}

export function LogButton() {
  const location = useLocation();
  if (location.pathname === loginRoute) {
    return <div />;
  }
  if (Cookies.get('user') === undefined) {
    return <LoginButton />;
  }
  return <LogoutButton />;
}
