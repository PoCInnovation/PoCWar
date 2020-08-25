import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { registerRoute } from '../consts/routes';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// textTransform: 'none',

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
    return <div></div>;
  }
  if (Cookies.get('user') === undefined) {
    return <RegButton />;
  } else {
    return <div></div>;
  }
}