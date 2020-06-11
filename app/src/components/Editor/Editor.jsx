import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { editorThemes } from '../../consts/editorThemes';
import { languages } from '../../consts/languages';

editorThemes.forEach((editorTheme) => require(`ace-builds/src-noconflict/theme-${editorTheme}`));
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  paperBlock: {
    margin: '1%',
  },
  editor: {
    borderRadius: '3px',
  }
}));

export default function Editor({ editValue, setEditValue, language, theme }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paperBlock}>
        <AceEditor className={classes.editor}
          mode={language}
          theme={theme}
          width='100%'
          height='800px'
          fontSize={16}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          showGutter={true}
          name='MainEditor'
          showPrintMargin={false}
          editorProps={{ $blockScrolling: true }}
          value={editValue}
          onChange={(newValue) => { setEditValue(newValue) }}
        />
      </Paper>
    </div>
  );
}
