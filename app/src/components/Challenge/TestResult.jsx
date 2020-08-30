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
  },
  title: {
    float: 'left',
    marginLeft: '5%',
  },
  category: {
    float: 'right',
    marginRight: '5%',
  },
}));

export default function TestResult({ name, state }) {
  const classes = useStyles();

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs={12}>
        <Paper className={classes.challenge}>
          <p className={classes.title}>{name}</p>
          <p className={classes.category}>{state}</p>
        </Paper>
      </Grid>
    </Grid>
  );
}
