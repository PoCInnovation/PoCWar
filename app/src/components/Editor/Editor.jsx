import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-jsx';
import Button from '@material-ui/core/Button';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '90%',
  },
  paperBlock: {
    margin: '1%',
  },
  editor: {
    borderRadius: '3px',
  }
}));

const themes = [
  'chrome',
  'clouds',
  'crimson_editor',
  'dawn',
  'dreamweaver',
  'eclipse',
  'github',
  'iplastic',
  'solarized_light',
  'textmate',
  'tomorrow',
  'xcode',
  'kuroir',
  'katzenmilch',
  'sqlserver',
  'ambiance',
  'chaos',
  'clouds_midnight',
  'dracula',
  'cobalt',
  'gruvbox',
  'gob',
  'idle_fingers',
  'kr_theme',
  'merbivore',
  'merbivore_soft',
  'mono_industrial',
  'monokai',
  'nord_dark',
  'pastel_on_dark',
  'solarized_dark',
  'terminal',
  'tomorrow_night',
  'tomorrow_night_blue',
  'tomorrow_night_bright',
  'tomorrow_night_eighties',
  'twilight',
  'vibrant_ink',
];

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css',
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

export default function Editor(props) {
  const classes = useStyles();
  const [theme, setTheme] = useState(props.theme);
  const [language, setLanguage] = useState(props.language);
  const [editValue, seteditValue] = useState('');

  return (
    <div className={classes.root}>
      <Paper className={classes.paperBlock}>
        <AceEditor className={classes.editor}
          mode={language}
          theme={theme}
          width='100%'
          height='800px'
          fontSize={props.fontSize || 16}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          showGutter={true}
          name='MainEditor'
          showPrintMargin={false}
          editorProps={{ $blockScrolling: true }}
          value={editValue}
          onChange={(newValue) => { seteditValue(newValue) }}
        />
      </Paper>
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
              {themes.map((newthemes) => (
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
          <Button
            className={classes.formControl}
            variant='contained'
            onClick={() => {
              alert(editValue);
            }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
