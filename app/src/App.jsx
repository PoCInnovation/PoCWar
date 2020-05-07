import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditorLayout from "./layouts/Editor";
import HomeLayout from "./layouts/Home";
import LoginLayout from "./layouts/Login";
import { editorRoute, homeRoute, loginRoute } from "./consts/routes";
import { app } from './firebase/core';

export default function App() {
  var user = app.auth().currentUser;

  return (
    <Router>
      <Switch>
        <Route path={editorRoute}>
          <EditorLayout user={user}/>
        </Route>
        <Route path={loginRoute}>
          <LoginLayout user={user}/>
        </Route>
        <Route path={homeRoute}>
          <HomeLayout user={user}/>
        </Route>
      </Switch>
    </Router>
  );
}
