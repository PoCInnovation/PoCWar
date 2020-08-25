import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChallengeLayout from './layouts/Challenge';
import HomeLayout from './layouts/Home';
import LoginLayout from './layouts/Login';
import RegisterLayout from './layouts/Register';
import CreateChallLayout from './layouts/CreateChall';
import { ThemeProvider } from '@material-ui/core';
import theme from './consts/themes';
import {
  createChallRoute,
  editorRoute,
  homeRoute,
  loginRoute,
  registerRoute,
} from './consts/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <style>{`body { background-color: ${theme.palette.primary.dark}; }`}</style>
      <Router>
        <Switch>
          <Route path={createChallRoute}>
            <CreateChallLayout />
          </Route>
          <Route path={editorRoute}>
            <ChallengeLayout />
          </Route>
          <Route path={loginRoute}>
            <LoginLayout />
          </Route>
          <Route path={registerRoute}>
            <RegisterLayout />
          </Route>
          <Route path={homeRoute}>
            <HomeLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
