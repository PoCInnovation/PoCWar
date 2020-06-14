import React from 'react';
import { Grid, FormControl, InputLabel, makeStyles, Select, MenuItem, Button, CircularProgress } from '@material-ui/core';
import languages from '../consts/languages';
import editorThemes from '../consts/editorThemes';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    width: '90%',
  },
}));

export default function EditorSubBar({ theme, setTheme, language, setLanguage, onClickSubmit, isSubmiting }) {
  const classes = useStyles();
  let submitButton = null;

  if (isSubmiting) {
    submitButton = <CircularProgress color='secondary' />;
  } else {
    submitButton = <Button
      className={classes.formControl}
      variant='contained'
      onClick={onClickSubmit}>
      Submit
    </Button>
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
              onChange={(event) => { setTheme(event.target.value) }}
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
              onChange={(event) => { setLanguage(event.target.value) }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
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