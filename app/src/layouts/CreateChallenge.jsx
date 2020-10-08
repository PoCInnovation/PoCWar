import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ChallengeEditor from '../components/Challenge/ChallengeEditor';
import { getHeaders, http } from '../utils/server';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../reducers/actions/snackBarAction';

const CreateChallenge = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const [testList, setList] = useState('[\n\t{\n\t\t"name": "Test 1",\n\t\t"args": [\n\t\t\t"Arg1",\n\t\t\t"Arg2"\n\t\t],\n\t\t"out": "Arg1Arg2",\n\t\t"err": "",\n\t\t"ret": 0\n\t}\n]');
  const submitChallenge = async (data) => {
    try {
      data.input_example = '----';
      data.output_example = '----';
      await http.post('/challenge', {
        ...data,
        tests: JSON.parse(testList),
      }, getHeaders())
        .then(() => {
          history.push(`/editor?challengeSlug=${data.slug}`);
        })
        .catch((err) => {
          dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to create challenge.'));
        });
    } catch (e) {
       dispatch(showSnackbar('You must be logged in to post a challenge.'));
    }
  };
  return (
    <ChallengeEditor 
      history={history}
      name=''
      category=''
      slug=''
      description=''
      testList={testList}
      setList={setList}
      submit={submitChallenge}
    />
  )
});
export default CreateChallenge;
