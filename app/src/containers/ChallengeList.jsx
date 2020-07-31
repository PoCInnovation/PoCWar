import React from 'react';
import ChallengeDescription from '../components/Challenge/ChallengeDescription';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import useChallenges from '../hooks/challenges';

export default function ChallengeList() {
  let challenges = null
  const data = useChallenges();
  if (data.loading === true) {
    challenges = <CircularProgress color='secondary' />;
  } else if (data.error || data.challenges === null || data.challenges.length === 0) {
    challenges = <ChallengeDescription title='__NOCHALL__' category='__NOCATEGORY__' id='-1' />;
  } else {
    challenges = [];
    let i = 0;
    console.log(data);
    data.challenges.forEach((chall) => {
      challenges.push(
        <ChallengeDescription key={i} title={chall.data.title} category={chall.data.category} id={chall.id} />
      );
      i += 1;
    })
  }

  return (
    <Grid container justify='center'>
      {challenges}
    </Grid>
  );
}