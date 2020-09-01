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
  let submitButton = null;

  if (localStorage.getItem(localStorageLanguage) !== null) {
    setLanguage(localStorage.getItem(localStorageLanguage));
  }

  if (localStorage.getItem(localStorageTheme) !== null) {
    setTheme(localStorage.getItem(localStorageTheme));
  }

  function onLanguageChange(aceLanguage) {
    setLanguage(aceLanguage);
    localStorage.setItem(localStorageLanguage, aceLanguage);
  }

  function onThemeChange(theme) {
    setTheme(theme);
    localStorage.setItem(localStorageTheme, theme);
  }

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
              {editorThemes.map((newthemes) => (
                <MenuItem key={newthemes} value={newthemes}>
                  {newthemes}
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
