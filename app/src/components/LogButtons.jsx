import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginRoute, homeRoute } from '../consts/routes';

function LoginButton() {
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

function LogoutButton({ email }) {
  const history = useHistory();
  return (
    <Button
      color='inherit'
      onClick={async () => {
        Cookies.remove('user');
        history.push(homeRoute);
      }}
    >
      {email}
    </Button>
  );
}

export default function LogButton() {
  const location = useLocation();
  if (location.pathname === loginRoute) {
    return <div />;
  }
  const user = Cookies.get('user');
  if (!user) {
    return <LoginButton />;
  }
  return <LogoutButton email={JSON.parse(user).email} />;
}
