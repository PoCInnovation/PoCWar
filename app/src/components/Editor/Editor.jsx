import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { makeStyles, Paper } from '@material-ui/core';

import editorThemes from '../../consts/editorThemes';
import autocompleteLanguages from '../../consts/autoComplete';
import { languages } from '../../consts/languages';

// eslint-disable-next-line global-require,import/no-dynamic-require
editorThemes.forEach((editorTheme) => require(`ace-builds/src-noconflict/theme-${editorTheme}`));

autocompleteLanguages.forEach((lang) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  require(`ace-builds/src-noconflict/mode-${languages[lang]}`);
  // eslint-disable-next-line global-require,import/no-dynamic-require
  require(`ace-builds/src-noconflict/snippets/${languages[lang]}`);
});

const langsForAce = {
  C: 'c_cpp',
  'C++': 'c_cpp',
  python3: 'python',
  javascript: 'javascript',
  go: 'golang',
  ruby: 'ruby',
  rust: 'rust',
};

const useStyles = makeStyles(() => ({
  paperBlock: {
    margin: '1%',
  },
  editor: {
    borderRadius: '3px',
  },
}));


export default function Editor({
  editValue, setEditValue, language, theme,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paperBlock}>
      <AceEditor
        className={classes.editor}
        mode={langsForAce[language]}
        theme={theme}
        fontSize={16}
        width='100%'
        height='750px'
        enableBasicAutocompletion
        enableLiveAutocompletion
        showGutter
        name='MainEditor'
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        value={editValue}
        onChange={(newValue) => { setEditValue(newValue); }}

      />
    </Paper>
  );
}
