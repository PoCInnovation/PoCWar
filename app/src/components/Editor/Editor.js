import React from 'react';
import './Editor.css';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-nord_dark';

export default function Editor(props) {
  return (
    <div class='Editor'>
      <AceEditor
        mode={props.language}
        theme={props.theme}
        width={'100%'}
        height={'800px'}
        fontSize={props.fontSize}
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
