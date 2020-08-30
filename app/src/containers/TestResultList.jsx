import React from 'react';
import { Grid } from '@material-ui/core';
import TestResult from '../components/Challenge/TestResult';

export default function TestResultList({ tests }) {
  const challenges = [];
  if (tests === undefined) {
    return (<div />);
  }
  for (let i = 0; i < tests.length; i += 1) {
    challenges.push(
      <TestResult name={tests[i].name} state={tests[i].pass ? 'Passed' : 'Failed'} key={i} />,
    );
  }
  return (
    <Grid
      container
      justify='center'
      style={{
        height: '20%',
        overflowY: 'scroll',
      }}
    >
      {challenges}
    </Grid>
  );
}
