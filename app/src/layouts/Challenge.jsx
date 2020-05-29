import React from 'react';
import NavBar from '../containers/NavBar';
import Editor from '../components/Editor/Editor';
import StatingDisplay from '../containers/StatingDisplay';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import StdLog from '../components/StdLog/StdLog';
import useChallenge from '../hooks/challenge';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    position: 'relative',
  },
  loading: {
    paddingTop: '20%',
  }
}));

export default function ChallengeLayout() {
  const classes = useStyles();
  const query = new URLSearchParams(window.location.search);
  const c = useChallenge(query.get('challengeID'));
  let display = null;

  if (c.loading === true) {
    display = <>
      <Grid className={classes.loading} container justify='center'>
        <CircularProgress color='secondary' />;
      </Grid>
    </>
  } else if (c.challenge !== null) {
    const d = c.challenge;
    display = <>
      <Grid className={classes.gridRoot} container spacing={0}>
        <Grid item xs={12} sm={4}>
          <StatingDisplay title={d.title} inputExample={d.input_example} outputExample={d.output_example} stating={d.description} />
          <StdLog stdout={'output'} stderr='output error'></StdLog>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Editor language='python' theme='dracula' />
        </Grid>
      </Grid>
    </>
  }

  return (
    <div>
      <NavBar />
      {display}
    </div>
  );
}
