import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChallengeEditor from '../components/Challenge/ChallengeEditor';
import useChallenge, { useChallengeTests } from '../hooks/challenge';
import { getHeaders, http } from '../utils/server';
import { showSnackbar } from '../reducers/actions/snackBarAction';

const EditChallenge = withRouter(({ history }) => {
  const query = new URLSearchParams(window.location.search);
  const challengeSlug = query.get('challengeSlug');
  const [codeSource, setEditCode] = useState('');
  const { isLoading, challenge } = useChallenge(challengeSlug, setEditCode);
  const dispatch = useDispatch();
  const [testList, setList] = useState();
  const submitChallenge = async (data) => {
    try {
      await http.patch(`/admin/challenge/${challengeSlug}`, data, getHeaders())
        .then(() => {
          console.log('Challenge updated, waiting for tests');
        })
        .catch((err) => {
          dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to update challenge.'));
        });
      await http.put(`/admin/challenge/${challengeSlug}/tests`, JSON.parse(testList), getHeaders())
        .then(() => {
          history.push('/admin');
        })
        .catch((err) => {
          dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to update tests.'));
        });
    } catch (e) {
      console.log(e);
      dispatch(showSnackbar('You must be admin to update a challenge.'));
    }
  };
  if (isLoading) {
    return (
      <Grid style={{ paddingTop: '20%' }} container justify='center'>
        <CircularProgress color='secondary' />
      </Grid>
    );
  }
  return (
    <ChallengeEditor
      history={history}
      name={challenge.name}
      category={challenge.category}
      slug={challenge.slug}
      description={challenge.description}
      testList={JSON.stringify(challenge ? challenge.tests : '', null, 4)}
      setList={setList}
      submit={submitChallenge}
    />
  );
});

export default EditChallenge;
