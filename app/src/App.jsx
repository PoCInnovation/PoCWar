import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import ChallengeLayout from './layouts/Challenge';
import ChallengeHomeLayout from './layouts/ChallengeHome';
import ProfileLayout from './layouts/Profile';
import HomeLayout from './layouts/Home';
import LoginLayout from './layouts/Login';
import RegisterLayout from './layouts/Register';
import CreateChallLayout from './layouts/CreateChallenge';
import EditChallLayout from './layouts/EditChallenge';
import theme from './consts/themes';
import {
  createChallRoute,
  editChallRoute,
  editorRoute,
  homeRoute,
  challengeRoute,
  profileRoute,
  loginRoute,
  registerRoute,
  adminRoute,
} from './consts/routes';
import AdminLayout from './layouts/Admin';
import NavBar from './containers/NavBar';
import GlobalSnackbar from './containers/SnackBar';
import { userIsAdmin, userIsLoggedIn } from './utils/auth';

function AuthenticatedRoute({ component: Component, path, auth }) {
  return (
    <Route
      path={path}
      render={(props) => (auth
        ? (<Component {...props} />)
        : (<Redirect to={`${loginRoute}?redirect=${props.location.pathname}${props.location.search}`} />))}
    />
  );
}

export default function App() {
  const isAuth = userIsLoggedIn();
  const isAdmin = userIsAdmin();
  return (
    <ThemeProvider theme={theme}>
      <style>{`body { background-color: ${theme.palette.primary.dark}; }`}</style>
      <GlobalSnackbar />
      <Router>
        <NavBar />
        <Switch>
          <AuthenticatedRoute path={createChallRoute} component={CreateChallLayout} auth={isAdmin} />
          <AuthenticatedRoute path={editChallRoute} component={EditChallLayout} auth={isAdmin} />
          <AuthenticatedRoute path={editorRoute} component={ChallengeLayout} auth={isAuth} />
          <Route path={loginRoute}>
            <LoginLayout />
          </Route>
          <Route path={registerRoute}>
            <RegisterLayout />
          </Route>
          <Route path={challengeRoute}>
            <ChallengeHomeLayout />
          </Route>
          <AuthenticatedRoute path={profileRoute} component={ProfileLayout} auth={isAuth} />
          <AuthenticatedRoute path={adminRoute} component={AdminLayout} auth={isAdmin} />
          <Route path={homeRoute}>
            <HomeLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
