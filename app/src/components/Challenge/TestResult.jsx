import React from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';

import theme from '../../consts/themes';

const useStyles = makeStyles(() => ({
  challenge: {
    height: '60px',
    marginBottom: '2%',
    background: theme.palette.primary.main,
    alignItems: 'center',
    margin: '2%',
    position: 'relative'
  },
  title: {
    marginLeft: '5%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  category: {
    right: 0,
    marginRight: '5%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
}));

export default function TestResult({ name, state }) {
  const classes = useStyles();

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs={12}>
        <Paper className={classes.challenge}>
          <span className={classes.title}>{name}</span>
          <span className={classes.category}>{state}</span>
        </Paper>
      </Grid>
    </Grid>
  );
}
