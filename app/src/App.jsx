import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChallengeLayout from './layouts/Challenge';
import HomeLayout from './layouts/Home';
import LoginLayout from './layouts/Login';
import { editorRoute, homeRoute, loginRoute } from './consts/routes';
import { app } from './firebase/core';
import { ThemeProvider } from '@material-ui/core';
import theme from './consts/themes';

export default function App() {
  var user = app.auth().currentUser;

  return (
    <ThemeProvider theme={theme}>
    <style>{`body { background-color: ${theme.palette.primary.dark}; }`}</style>
      <Router>
        <Switch>
          <Route path={editorRoute}>
            <ChallengeLayout user={user} />
          </Route>
          <Route path={loginRoute}>
            <LoginLayout user={user} />
          </Route>
          <Route path={homeRoute}>
            <HomeLayout user={user} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
