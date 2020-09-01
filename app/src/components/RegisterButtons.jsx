import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { registerRoute } from '../consts/routes';

export function RegButton() {
  const history = useHistory();
  const redirectRegister = () => {
    history.push(registerRoute);
  };

  return (
    <Button color='inherit' onClick={redirectRegister}>
      Register
    </Button>
  );
}

export function RegisterButton() {
  const location = useLocation();
  if (location.pathname === registerRoute) {
    return <div />;
  }
  if (Cookies.get('user') === undefined) {
    return <RegButton />;
  }
  return <div />;
}
