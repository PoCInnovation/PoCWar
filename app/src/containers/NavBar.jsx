import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { common } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import PocWarLogo from '../components/Logo/PocWarLogo';
import { LogButton } from '../components/LogButtons';

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
  },
}));

export default function NavBar({ user }) {
  const classes = useStyles();

  return (
    <AppBar color={common.white} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <PocWarLogo className={classes.pocWarLogo} />
        <Typography variant='h6' className={classes.title} />
        <LogButton user={user} />
      </Toolbar>
    </AppBar>
  );
}
