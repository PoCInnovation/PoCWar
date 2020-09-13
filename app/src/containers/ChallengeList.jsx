import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import ChallengeDescription from '../components/Challenge/ChallengeDescription';
import useChallenges from '../hooks/challenges';
import Pagination from '@material-ui/lab/Pagination';

export default function ChallengeList() {
  let challenges = null;
  let pageCount = 1;
  const [page, setPage] = React.useState(1);
  const data = useChallenges(page);
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (data.isLoading) {
    challenges = <CircularProgress color='secondary' />;
  } else if (data.error || !data?.challengesList?.challenges || !data.challengesList?.challenges.length) {
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
      <Pagination count={pageCount} page={page} onChange={handleChange} color="primary"/>
    </Grid>
  );
}
