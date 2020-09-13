import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { challengeRoute } from '../consts/routes'
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  span: {
    fontFamily: 'aAtmospheric',
    marginTop: '5%',
    marginBottom: '5%'
  }
}));

const Home = withRouter(({ history }) => {
  const classes = useStyles();
  return (
    <Grid container style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span className={classes.span} style={{fontSize:50}}>
        Welcome to
      </span>
      <span className={classes.span} style={{fontSize:100}}>
        PoCWar
      </span>
      <Button 
        color="primary"
        variant="contained"
        style={{
          fontSize: 60,
          width: '35%',
          marginTop: '5%',
          borderRadius: 50
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