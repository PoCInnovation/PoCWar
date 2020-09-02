import React from 'react';
import {
  Grid, FormControl, InputLabel, makeStyles, Select, MenuItem, Button, CircularProgress,
} from '@material-ui/core';
import languages from '../consts/languages';
import editorThemes from '../consts/editorThemes';
import autocompleteLanguages from '../consts/autoComplete';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    width: '90%',
  },
}));

export default function EditorSubBar({
  theme, setTheme, language, setLanguage, onClickSubmit, isSubmitting,
}) {
  const query = new URLSearchParams(window.location.search);
  const challengeID = query.get('challengeID');
  const localStorageLanguage = `${challengeID}_language`;
  const localStorageTheme = `${challengeID}_theme`;
  const classes = useStyles();

  const editorLanguage = localStorage.getItem(localStorageLanguage);
  if (editorLanguage) {
    setLanguage(editorLanguage);
  }

  const editorTheme = localStorage.getItem(localStorageTheme);
  if (editorTheme) {
    setTheme(editorTheme);
  }

  function onLanguageChange(aceLanguage) {
    setLanguage(aceLanguage);
    localStorage.setItem(localStorageLanguage, aceLanguage);
  }

  function onThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem(localStorageTheme, newTheme);
  }

  let submitButton = null;
  if (isSubmitting) {
    submitButton = <CircularProgress color='secondary' />;
  } else {
    submitButton = (
      <Button
        className={classes.formControl}
        variant='contained'
        onClick={onClickSubmit}
      >
        Submit
      </Button>
    );
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Themes</InputLabel>
            <Select
              labelId='change_label'
              id='change_form'
              value={theme}
              onChange={(event) => { onThemeChange(event.target.value); }}
            >
              {editorThemes.map((newThemes) => (
                <MenuItem key={newThemes} value={newThemes}>
                  {newThemes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              onChange={(event) => { onLanguageChange(event.target.value); }}
            >
              {autocompleteLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {languages[lang]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container justify='center'>
            {submitButton}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
