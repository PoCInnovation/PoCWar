import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChallengeLayout from './layouts/Challenge';
import HomeLayout from './layouts/Home';
import LoginLayout from './layouts/Login';
import { editorRoute, homeRoute, loginRoute } from './consts/routes';
import { ThemeProvider } from '@material-ui/core';
import theme from './consts/themes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <style>{`body { background-color: ${theme.palette.primary.dark}; }`}</style>
      <Router>
        <Switch>
          <Route path={editorRoute}>
            <ChallengeLayout />
          </Route>
          <Route path={loginRoute}>
            <LoginLayout />
          </Route>
          <Route path={homeRoute}>
            <HomeLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
