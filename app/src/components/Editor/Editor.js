import React, {useState} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import "ace-builds/src-noconflict/mode-jsx";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  editor: {
    borderRadius: 3,
    border: '3px solid rgb(150, 150, 150)',
  }
}));

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

export default function Editor(props) {
  const classes = useStyles();
  const [theme, setTheme] = useState(props.theme);
  const [language, setLanguage] = useState(props.language);
  const [autocompletebasic, setAutocompletebasic] = useState("false");
  const [autocompletelive, setAutocompletelive] = useState("false");
  const [editValue, seteditValue] = useState("");

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel>Themes</InputLabel>
        <Select
            labelId="change_label"
            id="change_form"
            value={theme}
            onChange={(event) => {setTheme(event.target.value)}}>
          {themes.map(newthemes => (
              <MenuItem key={newthemes} value={newthemes}>
                {newthemes}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Language</InputLabel>
        <Select
            value={language}
            onChange={(event) => {setLanguage(event.target.value)}}>
          {languages.map(lang => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
          className={classes.formControl}
          value="autocompletion"
          onChange={(e) => {setAutocompletebasic(e.target.checked);
          setAutocompletelive(e.target.checked)}}
          control={<Checkbox color="primary" />}
          label="Auto completion"
          labelPlacement="end"
      />
      <Button className={classes.formControl} variant="contained" onClick={() => {alert(editValue)}}>Submit</Button>
      <AceEditor
          className={classes.editor}
          mode={language}
          theme={theme}
          width={'50%'}
          height={'800px'}
          fontSize={props.fontSize || 16}
          enableBasicAutocompletion={autocompletebasic}
          enableLiveAutocompletion={autocompletelive}
          showGutter={false}
          name='MainEditor'
          showPrintMargin={false}
          editorProps={{ $blockScrolling: true }}
          value={editValue}
          onChange={(newValue) => {seteditValue(newValue)}}
      />
    </div >
  );
}
