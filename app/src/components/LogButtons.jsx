import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { loginRoute, homeRoute } from '../consts/routes';
import { signout } from '../firebase/sign';
import { app } from '../firebase/core';
import { useLocation } from 'react-router-dom';

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
  const user = app.auth().currentUser;
  const history = useHistory();

  return (
    <Button color='inherit' onClick={async () => {
      await signout();
      history.push(homeRoute);
    }}>
      {user.email}
    </Button>
  );
}

export function LogButton() {
  const location = useLocation();
  if (location.pathname === loginRoute) {
    return <div></div>;
  }
  if (app.auth().currentUser === null) {
    return <LoginButton />;
  } else {
    return <LogoutButton />;
  }
}