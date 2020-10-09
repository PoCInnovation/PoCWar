import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, Grid } from '@material-ui/core';

import { challengeRoute } from '../consts/routes';

const useStyles = makeStyles(() => ({
  span: {
    fontFamily: 'aAtmospheric',
    marginTop: '5%',
    marginBottom: '5%',
    color: '#a8a8a8',
  },
}));

const Home = withRouter(({ history }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span className={classes.span} style={{ fontSize: 50 }}>
        Welcome to
      </span>
      <span className={classes.span} style={{ fontSize: 100 }}>
        PoCWar
      </span>
      <Button
        color='primary'
        variant='contained'
        style={{
          fontSize: 60,
          width: '35%',
          marginTop: '5%',
          borderRadius: 50,
        }}
        onClick={async () => {
          history.push(challengeRoute);
        }}
      >
        {'<Play />'}
      </Button>
    </Grid>
  );
});

export default Home;
