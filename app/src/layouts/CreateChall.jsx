import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import BackupIcon from '@material-ui/icons/Backup';
import Fab from '@material-ui/core/Fab';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TestEditor, { getTestEditorValues } from '../components/Challenge/TestEditor';
import { http } from '../utils/server';
import { showSnackbar } from '../reducers/actions/snackBarAction';

const nbOfTests = [1];
const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
    borderColor: theme.palette.primary.A100,
  },
}));

function TestList({ tests, deleteFunction }) {
  const items = tests.map((i) => (
    <div key={i.toString()} id='testList'>
      <TestEditor deleteFunction={deleteFunction} />
    </div>
  ));
  return (
    <div>
      <FormLabel>Tests</FormLabel>
      {items}
    </div>
  );
}

const CreateChallenge = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('dracula');
  const [list, setList] = useState(nbOfTests);
  const classes = useStyles(theme);

  async function submitChallenge() {
    let auth;
    try {
      auth = {
        Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token}`,
      };
    } catch (e) {
      dispatch(showSnackbar('You must be logged in to post a challenge.'));
      return;
    }
    const data = {
      name: document.getElementById('challNameField').value,
      slug: document.getElementById('slugField').value,
      category: document.getElementById('challCategoryField').value,
      description: document.getElementById('challDescriptionField').value,
      input_example: document.getElementById('challInputExampleField').value,
      output_example: document.getElementById('challOutputExampleField').value,
      tests: getTestEditorValues(),
      author: JSON.parse(Cookies.get('user')).email,
    };
    await http.post('/challenge', data, { headers: auth })
      .catch((e) => console.log(e));
    history.push(`/editor?challengeID=${data.slug}`);
  }

  function addTests() {
    if (list.length === 0) {
      setList(list.concat(1));
    } else {
      setList(list.concat(list[list.length - 1] + 1));
    }
  }

  function deleteTest() {
    list.pop();
    setList(list.concat());
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '35%',
          margin: '0px 10px',
        }}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            id='challNameField'
            label='Challenge name'
            name='challName'
            autoComplete='challName'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            id='challCategoryField'
            label='Challenge category'
            name='category'
            autoComplete='category'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            id='slugField'
            label='Slug'
            name='slug'
            autoComplete='slug'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
          />
        </div>

        <div style={{ marginRight: '10px', width: '100%' }}>
          <TextField
            variant='outlined'
            margin='normal'
            id='challDescriptionField'
            label='Description'
            name='description'
            autoComplete='description'
            autoFocus
            multiline
            fullWidth
            rows={15}
            InputProps={{
              className: classes.input,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                variant='outlined'
                margin='normal'
                id='challInputExampleField'
                label='Input example'
                name='inputExample'
                autoComplete='inputExample'
                required
                autoFocus
                InputProps={{
                  className: classes.input,
                }}
                style={{
                  width: '49%',
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                id='challOutputExampleField'
                label='Output example'
                name='outputExample'
                autoComplete='outputExample'
                required
                autoFocus
                InputProps={{
                  className: classes.input,
                }}
                style={{
                  width: '49%',
                }}
              />
            </div>
            <br />
            <div>
              <TestList tests={list} deleteFunction={deleteTest} />
              <Fab color='primary' aria-label='add' onClick={() => addTests(list, setList)}>
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <Fab color='primary' aria-label='submit' onClick={submitChallenge} style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
        <BackupIcon />
      </Fab>
    </div>
  );
});

export default CreateChallenge;
