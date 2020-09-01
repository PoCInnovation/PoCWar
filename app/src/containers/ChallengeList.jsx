import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import ChallengeDescription from '../components/Challenge/ChallengeDescription';
import useChallenges from '../hooks/challenges';

export default function ChallengeList() {
  let challenges = null;
  const data = useChallenges();
  if (data.isLoading) {
    challenges = <CircularProgress color='secondary' />;
  } else if (data.error || data.challenges === null || data.challenges.length === 0) {
    challenges = <ChallengeDescription title='__NOCHALL__' category='__NOCATEGORY__' id='-1' />;
  } else {
    challenges = data.challenges.map((challenge) => (
      <ChallengeDescription
        key={challenge.id}
        title={challenge.name}
        category={challenge.category}
        slug={challenge.slug}
        validated={challenge.passAllTests}
      />
    ));
  }
  return (
    <Grid container justify='center'>
      {challenges}
    </Grid>
  );
}
