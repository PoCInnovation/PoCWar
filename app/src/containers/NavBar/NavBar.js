import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { common } from '@material-ui/core/colors';
import PocWarLogo from '../../components/Logo/PocWarLogo';
import { Typography } from '@material-ui/core';
import { loginRoute } from '../../consts/routes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 60,
  },
  pocWarLogo: {
    width: 100,
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const redirectLogin = () => {
    history.push(loginRoute);
  };

  return (
    <AppBar color={common.white} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <PocWarLogo className={classes.pocWarLogo}/>
        <Typography variant="h6" className={classes.title} />
        <Button color="inherit" onClick={redirectLogin}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
