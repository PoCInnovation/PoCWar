import React from 'react';
import Editor from '../Editor/Editor';
import Header from '../Header/Header';
import { Grid } from '@material-ui/core';

export default function App() {
  return (
    <div>
      <Header/>
      <br></br>
      <Grid container >
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Editor
            language='python'
            theme='monokai'
            fontSize={16}
          />
        </Grid>
      </Grid>
    </div >
  );
}
