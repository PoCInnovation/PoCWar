import React from 'react';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { loginRoute } from "../consts/routes";
import { app } from '../firebase/core';

export function LoginButton() {
  const history = useHistory();
  const redirectLogin = () => {
    history.push(loginRoute);
  };

  return (
    <Button color="inherit" onClick={redirectLogin}>
      Login
    </Button>
  );
}

export function LogoutButton() {
  return (
    <Button color="inherit" onClick={app.auth().signOut}>
      Logout
    </Button>
  );
}

export function LogButton({ user }) {
  if (user == null) {
    return <LoginButton />;
  } else {
    return <LogoutButton />;
  }
}