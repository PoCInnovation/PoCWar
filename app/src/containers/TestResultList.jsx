import React from 'react';
import { Grid } from '@material-ui/core';
import TestResult from '../components/Challenge/TestResult';

export default function TestResultList({ tests }) {
  if (!tests) {
    return (<div />);
  }
  const challenges = tests.map((test) => (
    <TestResult name={test.name} state={test.pass ? 'Passed' : 'Failed'} key={test.name} />
  ));
  return (
    <Grid
      container
      justify='center'
      style={{
        height: '20%',
        overflowY: 'auto',
      }}
    >
      {challenges}
    </Grid>
  );
}
