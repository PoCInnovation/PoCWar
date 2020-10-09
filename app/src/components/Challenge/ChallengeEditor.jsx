import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import Fab from '@material-ui/core/Fab';
import { useDispatch } from 'react-redux';
import 'ace-builds/src-noconflict/mode-json';
import { useForm } from 'react-hook-form';
import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';
import { showSnackbar } from '../../reducers/actions/snackBarAction';
import editorThemes from '../../consts/editorThemes';

const useStyles = makeStyles(() => ({
  input: {
    background: '#272A35',
  },
  submitChallenge: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
  },
}));

export default function ChallengeEditor({
  name, category, slug, description, testList, setList, submit,
}) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('dracula');
  const [_description, setDescription] = useState(description);
  const classes = useStyles(theme);
  const [_testList, _setList] = useState(testList);

  const submitChallengeError = (localErrors) => {
    Object.values(localErrors).some((value) => {
      if (value.message) {
        dispatch(showSnackbar(value.message));
        return true;
      }
      return false;
    });
  };

  const parseHtml = htmlParser({
    isValidNode: (node) => node.type !== 'script',
    processingInstructions: [/* ... */],
  });

  const onThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit, submitChallengeError)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
            defaultValue={name}
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
            defaultValue={category}
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
            defaultValue={slug}
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
          <div
            style={{
              background: '#272A35',
              borderRadius: 5,
              overflow: 'auto',
              color: 'white',
              height: 600,
              padding: 10,
            }}
          >
            <ReactMarkdown
              source={_description}
              escapeHtml={false}
              astPlugins={[parseHtml]}
              style={{
                height: 200,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px', width: '100%' }}>
          <TextField
            variant='outlined'
            margin='normal'
            id='challengeDescription'
            label='Challenge description'
            name='description'
            autoComplete='challenge-description'
            defaultValue={_description}
            autoFocus
            multiline
            fullWidth
            rows={19}
            InputProps={{
              className: classes.input,
            }}
            inputRef={register({
              required: true,
            })}
            onChange={(a) => setDescription(a.target.value)}
            error={!!errors.description}
          />
          <AceEditor
            style={{
              borderRadius: '3px',
            }}
            mode='json'
            theme={theme}
            fontSize={16}
            width='100%'
            height='100%'
            enableBasicAutocompletion
            enableLiveAutocompletion
            showGutter
            name='MainEditor'
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
            value={_testList}
            onChange={(change) => {
              _setList(change);
              setList(change);
            }}
          />
          <div style={{ width: '25%' }}>
            <InputLabel>Themes</InputLabel>
            <Select
              labelId='change_label'
              id='change_form'
              value={theme}
              onChange={(event) => { onThemeChange(event.target.value); }}
            >
              {editorThemes.map((newThemes) => (
                <MenuItem key={newThemes} value={newThemes} style={{ backgroundColor: '#272A35' }}>
                  {newThemes}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <Fab type='submit' color='primary' aria-label='submit' className={classes.submitChallenge}>
          <BackupIcon />
        </Fab>
      </form>
    </div>
  );
}
