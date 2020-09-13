import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Cookies from 'js-cookie';
import ChallengeLayout from './layouts/Challenge';
import ChallengeHomeLayout from './layouts/ChallengeHome';
import ProfileLayout from './layouts/Profile';
import HomeLayout from './layouts/Home';
import LoginLayout from './layouts/Login';
import RegisterLayout from './layouts/Register';
import CreateChallLayout from './layouts/CreateChallenge';
import theme from './consts/themes';
import {
  createChallRoute,
  editorRoute,
  homeRoute,
  challengeRoute,
  profileRoute,
  loginRoute,
  registerRoute,
} from './consts/routes';
import NavBar from './containers/NavBar';
import GlobalSnackbar from './containers/SnackBar';

function AuthenticatedRoute({ component: Component, path }) {
  return (
    <Route
      path={path}
      render={(props) => {
        const isAuthenticated = Cookies.get('user');
        return (isAuthenticated ? <Component {...props} /> : (
          <Redirect
            to={`${loginRoute}?redirect=${props.location.pathname}${props.location.search}`}
          />
        ));
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <style>{`body { background-color: ${theme.palette.primary.dark}; }`}</style>
      <GlobalSnackbar />
      <Router>
        <NavBar />
        <Switch>
          <AuthenticatedRoute path={createChallRoute} component={CreateChallLayout} />
          <AuthenticatedRoute path={editorRoute} component={ChallengeLayout} />
          <Route path={loginRoute}>
            <LoginLayout />
          </Route>
          <Route path={registerRoute}>
            <RegisterLayout />
          </Route>
          <Route path={challengeRoute}>
            <ChallengeHomeLayout />
          </Route>
          <AuthenticatedRoute path={profileRoute} component={ProfileLayout} />
          <Route path={homeRoute}>
            <HomeLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
