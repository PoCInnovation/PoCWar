import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { registerRoute } from '../consts/routes';

function RegButton() {
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

export default function RegisterButton() {
  const location = useLocation();
  if (location.pathname === registerRoute || !!Cookies.get('user')) {
    return <div />;
  }
  return <RegButton />;
}
