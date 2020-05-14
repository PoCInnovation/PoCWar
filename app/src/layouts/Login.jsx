import React from "react";
import NavBar from "../containers/NavBar";
import Login from "../containers/Login"
// import { app } from '../firebase/core';
// import * as firebase from 'firebase';

export default function LoginLayout({ user }) {
  return (
    <div>
      <NavBar user={user} />
      <Login />
    </div>
  );
}
