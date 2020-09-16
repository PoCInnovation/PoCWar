import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ChallengeDescription from '../components/Challenge/ChallengeDescription';
import useChallenges from '../hooks/challenges';

export default function ChallengeList() {
  let pageCount = 1;
  const [page, setPage] = React.useState(1);
  const data = useChallenges(page);
  const handlePagination = (event, value) => { setPage(value); };

  let challenges;
  if (data.isLoading) {
    challenges = <CircularProgress color='secondary' />;
  } else if (
    data.error || !data.challengesList || !data.challengesList.challenges
    || !data.challengesList.challenges.length
  ) {
    challenges = <ChallengeDescription title='__NOCHALL__' category='__NOCATEGORY__' id='-1' />;
  } else {
    pageCount = data.challengesList.pageCount;
    challenges = data.challengesList.challenges.map((challenge) => (
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
      <Pagination count={pageCount} page={page} onChange={handlePagination} color='primary' />
    </Grid>
  );
}
