import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import EditorLayout from './layouts/Editor';
import Home from './layouts/Home';
import Login from './layouts/Login';
import {
  editorRoute,
  homeRoute,
  loginRoute
} from './consts/routes';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={editorRoute}>
          <EditorLayout />
        </Route>
        <Route path={loginRoute}>
          <Login />
        </Route>
        <Route path={homeRoute}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
