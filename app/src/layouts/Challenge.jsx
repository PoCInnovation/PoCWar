import React, { useState } from 'react';
import NavBar from '../containers/NavBar';
import Editor from '../components/Editor/Editor';
import StatingDisplay from '../containers/StatingDisplay';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import StdLog from '../components/StdLog/StdLog';
import useChallenge from '../hooks/challenge';
import EditorSubBar from '../containers/editorSubBar';
import axios from 'axios';
import apiEndpoint from '../consts/apiEndpoint';

const useStyles = makeStyles(() => ({
  gridRoot: {
    position: 'relative',
  },
  loading: {
    paddingTop: '20%',
  },
}));


export default function ChallengeLayout() {
  const classes = useStyles();
  const query = new URLSearchParams(window.location.search);
  const challengeID = query.get('challengeID');
  const c = useChallenge(challengeID);
  let display = null;

  const [theme, setTheme] = useState('dracula');
  const [language, setLanguage] = useState('python');
  const [editValue, setEditValue] = useState('');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  window.onload = () => {
    if (localStorage.getItem(challengeID) !== null) {
      setEditValue(localStorage.getItem(challengeID));
    }
  }

  function onEditorChange(change) {
    setEditValue(change);
    localStorage.setItem(challengeID, change);
  };

  if (c.loading === true) {
    display = <>
      <Grid className={classes.loading} container justify='center'>
        <CircularProgress color='secondary' />;
      </Grid>
    </>
  } else if (c.challenge !== null) {
    const d = c.challenge;
    display = <>
      <Grid className={classes.gridRoot} container spacing={0}>
        <Grid item xs={12} sm={4}>
          <StatingDisplay title={d.title} inputExample={d.input_example} outputExample={d.output_example} stating={d.description} />
          <StdLog stdout={stdout} stderr={stderr}></StdLog>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Editor language='python' theme='dracula' editValue={editValue} setEditValue={onEditorChange} />
          <EditorSubBar
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            editValue={editValue}
            isSubmiting={isSubmiting}
            onClickSubmit={async () => {
              try {
                setIsSubmiting(true);
                const res = await axios.post(new URL(language, apiEndpoint), { 'code': editValue });
                var stdout = res.data.stdout.replace(/\n+$/, "");
                var stderr = res.data.stderr.replace(/\n+$/, "");
                setStdout(stdout);
                setStderr(stderr);
                if (stdout === d.output_example) {
                  alert('Your output is identical to the expected output');
                }
              } catch (e) {
                alert(e.response.data.error);
              } finally {
                setIsSubmiting(false);
              }
            }} />
        </Grid>
      </Grid>
    </>
  }

  return (
    <div>
      <NavBar />
      {display}
    </div>
  );
}
