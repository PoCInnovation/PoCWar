import React, { useState } from 'react';
import NavBar from '../containers/NavBar';
import Editor from '../components/Editor/Editor';
import EditorSubBar from '../containers/editorSubBar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
  }
}));

export default function AddChallengeLayout() {
  const [theme, setTheme] = useState('dracula');
  const [language, setLanguage] = useState('python');
  const [editValue, setEditValue] = useState('');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const classes = useStyles(theme);

  function onEditorChange(change) {
    setEditValue(change);
  };
  return (
    <div>
      <NavBar />
        <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='challName'
            label='Challenge name'
            name='challName'
            autoComplete='challName'
            autoFocus
            InputProps={{
              className: classes.input
            }}
          />
      <Grid item xs={12} sm={8}>
        <Editor language={language} theme={theme} editValue={editValue} setEditValue={onEditorChange} />
      </Grid>
    </div>
  );
}