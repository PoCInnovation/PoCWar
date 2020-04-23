import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-nord_dark';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  editor: {
    borderRadius: 3,
    border: '3px solid rgb(150, 150, 150)',
  }
}));

export default function Editor(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AceEditor className={classes.editor}
        mode={props.language}
        theme={props.theme}
        width={'50%'}
        height={'800px'}
        fontSize={props.fontSize || 16}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
        showGutter={false}
        name='MainEditor'
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
      />
    </div >
  );
}
