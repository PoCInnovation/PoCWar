import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import BackupIcon from '@material-ui/icons/Backup';
import Fab from '@material-ui/core/Fab';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TestEditor, { getTestEditorValues } from '../components/Challenge/TestEditor';
import { getHeaders, http } from '../utils/server';
import { showSnackbar } from '../reducers/actions/snackBarAction';

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
    borderColor: theme.palette.primary.A100,
  },
  submitChallenge: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
  },
}));

const CreateChallenge = withRouter(({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('dracula');
  const [testList, setList] = useState([{name: '', args: [''], out: ''}]);
  const classes = useStyles(theme);

  const submitChallengeError = (localErrors) => {
    Object.values(localErrors).some((value) => {
      if (value.message) {
        dispatch(showSnackbar(value.message));
        return true;
      }
      return false;
    });
  };

  const submitChallenge = async (data) => {
    try {
      const headers = getHeaders();
      await http.post('/challenge', {
        ...data,
        tests: getTestEditorValues(),
      }, headers)
        .then(() => {
          history.push(`/editor?challengeID=${data.slug}`);
        })
        .catch((err) => {
          dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to create challenge.'));
        });
    } catch (e) {
      dispatch(showSnackbar('You must be logged in to post a challenge.'));
    }
  };

  const addTests = () => {
    const r = getTestEditorValues();
    r.push({name: '', args: [''], out: ''});
    setList(r);
  };
  const deleteTest = (i) => {
    let r = getTestEditorValues();
    r.splice(i,1);
    console.log(r, i)
    setList(r);
  }
  const TestList = () => {
    let items = []; 
    for (let i = 0; i < testList.length; i+=1) {
      items.push(<div key={i} id='testList'>
        <TestEditor deleteFunction={(i) => {deleteTest(i)}} index={i} value={testList[i]} />
      </div>)
    }
    return (
      <div>
        <FormLabel>Tests</FormLabel>
        {items}
      </div>
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitChallenge, submitChallengeError)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
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
            id='challengeName'
            label='Challenge name'
            name='name'
            autoComplete='challenge-name'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
            inputRef={register({
              required: true,
              minLength: {
                value: 4,
                message: 'Should contain at least 4 characters',
              },
              maxLength: {
                value: 50,
                message: 'Should not exceed 50 character',
              },
            })}
            error={!!errors.name}
          />
          <TextField
            variant='outlined'
            margin='normal'
            id='challengeCategory'
            label='Challenge category'
            name='category'
            autoComplete='challenge-category'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
            inputRef={register({
              required: true,
              minLength: {
                value: 4,
                message: 'Should contain at least 4 characters',
              },
              maxLength: {
                value: 50,
                message: 'Should not exceed 50 character',
              },
            })}
            error={!!errors.category}
          />
          <TextField
            variant='outlined'
            margin='normal'
            id='challengeSlug'
            label='Slug'
            name='slug'
            autoComplete='challenge-slug'
            autoFocus
            InputProps={{
              className: classes.input,
            }}
            inputRef={register({
              required: true,
              minLength: {
                value: 4,
                message: 'Should contain at least 4 characters',
              },
              maxLength: {
                value: 50,
                message: 'Should not exceed 50 character',
              },
            })}
            error={!!errors.slug}
          />
        </div>

        <div style={{ marginRight: '10px', width: '100%' }}>
          <TextField
            variant='outlined'
            margin='normal'
            id='challengeDescription'
            label='Challenge description'
            name='description'
            autoComplete='challenge-description'
            autoFocus
            multiline
            fullWidth
            rows={15}
            InputProps={{
              className: classes.input,
            }}
            inputRef={register({
              required: true,
              maxLength: {
                value: 500,
                message: 'Should not exceed 500 character',
              },
            })}
            error={!!errors.description}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                variant='outlined'
                margin='normal'
                id='challengeInputExample'
                label='Challenge input example'
                name='input_example'
                autoComplete='challenge-input-example'
                required
                autoFocus
                InputProps={{
                  className: classes.input,
                }}
                style={{
                  width: '49%',
                }}
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 500,
                    message: 'Should not exceed 500 character',
                  },
                })}
                error={!!errors.input_example}
              />
              <TextField
                variant='outlined'
                margin='normal'
                id='challengeOutputExample'
                label='Challenge output example'
                name='output_example'
                autoComplete='challenge-output-example'
                required
                autoFocus
                InputProps={{
                  className: classes.input,
                }}
                style={{
                  width: '49%',
                }}
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 500,
                    message: 'Should not exceed 500 character',
                  },
                })}
                error={!!errors.output_example}
              />
            </div>
            <br />
            <div>
              <TestList values={testList} />
              <Fab color='primary' aria-label='add' onClick={() => addTests()}>
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
        <Fab type='submit' color='primary' aria-label='submit' className={classes.submitChallenge}>
          <BackupIcon />
        </Fab>
      </form>
    </div>
  );
});

export default CreateChallenge;

// name must be shorter than or equal to 50 charactersname must be longer than or equal to 4 charactersname must be a stringslug must be shorter than or equal to 50 charactersslug must be longer than or equal to 4 charactersslug must be a stringdescription must be shorter than or equal to 500 charactersdescription must be a stringinput_example must be a stringoutput_example must be a stringcategory must be shorter than or equal to 50 characterscategory must be longer than or equal to 4 characterscategory must be a string
