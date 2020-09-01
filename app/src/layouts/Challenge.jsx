import React, { useState } from 'react';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';
import Editor from '../components/Editor/Editor';
import StatingDisplay from '../containers/StatingDisplay';

import StdLog from '../components/StdLog/StdLog';
import useChallenge from '../hooks/challenge';
import EditorSubBar from '../containers/editorSubBar';
import submitCode from '../hooks/submit';
import TestResultList from '../containers/TestResultList';

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
  const { isLoading, challenge } = useChallenge(challengeID);
  let display = null;

  const [theme, setTheme] = useState('dracula');
  const [language, setLanguage] = useState('python');
  const [editValue, setEditValue] = useState('');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [testsResult, setTestResult] = useState({ passed: null, failed: null });
  const [testsList, setTestList] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  window.onload = () => {
    if (localStorage.getItem(challengeID) !== null) {
      setEditValue(localStorage.getItem(challengeID));
    }
  };

  function onEditorChange(change) {
    setEditValue(change);
    localStorage.setItem(challengeID, change);
  }

  if (isLoading) {
    display = (
      <>
        <Grid className={classes.loading} container justify='center'>
          <CircularProgress color='secondary' />
          ;
        </Grid>
      </>
    );
  } else if (challenge !== null) {
    display = (
      <>
        <Grid className={classes.gridRoot} container spacing={0}>
          <Grid item xs={12} sm={4}>
            <StatingDisplay
              title={challenge.title}
              inputExample={challenge.input_example}
              outputExample={challenge.output_example}
              stating={challenge.description}
            />
            <StdLog stdout={stdout} stderr={stderr} />
            <TestResultList tests={testsList} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Editor
              language={language}
              theme={theme}
              editValue={editValue}
              setEditValue={onEditorChange}
            />
            <EditorSubBar
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              editValue={editValue}
              isSubmitting={isSubmitting}
              onClickSubmit={async () => {
                const res = await submitCode(challenge.id, language, editValue);
                if (res === undefined) {
                  return;
                }
                if (res.compilation !== undefined) {
                  setStderr(res.compilation.err);
                  setStdout(res.compilation.out);
                }
                setTestResult({ passed: res.passed, failed: res.failed });
                setTestList(res.tests);
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <div>
      {display}
    </div>
  );
}
