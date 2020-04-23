import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { common } from '@material-ui/core/colors';
import PocWarLogo from '../../components/Logo/PocWarLogo';
import { Typography } from '@material-ui/core';

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

  return (
    <AppBar color={common.white} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <PocWarLogo className={classes.pocWarLogo} />
        <Typography variant="h6" className={classes.title} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
