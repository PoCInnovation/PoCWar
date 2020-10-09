import React, { useState } from 'react';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Editor from '../components/Editor/Editor';
import StatingDisplay from '../containers/StatingDisplay';
import StdLog from '../components/StdLog/StdLog';
import useChallenge from '../hooks/challenge';
import EditorSubBar from '../containers/EditorSubBar';
import submitCode from '../hooks/submit';
import { clearSnackbar, showSnackbar } from '../reducers/actions/snackBarAction';
import { langsForSubmit } from '../consts/languages';
// import ProgressBar from '@bit/react-bootstrap.react-bootstrap.progress-bar';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    position: 'relative',
  },
  loading: {
    paddingTop: '20%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: theme.palette.primary.main,
    margin: '2%',
  },
}));


export default function ChallengeLayout() {
  const classes = useStyles();
  const query = new URLSearchParams(window.location.search);
  const challengeID = query.get('challengeSlug');
  // const { isLoading, challenge } = useChallenge(challengeID);
  const dispatch = useDispatch();
  let display = null;

  const [theme, setTheme] = useState('dracula');
  const [language, setLanguage] = useState('python3');
  const [editValue, setEditValue] = useState('');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [testsResult, setTestResult] = useState({ passed: null, failed: null });
  const [testsList, setTestList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, challenge } = useChallenge(challengeID, setEditValue);

  window.onload = () => {
    if (localStorage.getItem(challengeID) !== null) {
      setEditValue(localStorage.getItem(challengeID));
    }
  };

  const onEditorChange = (change) => {
    setEditValue(change);
    localStorage.setItem(challengeID, change);
  };

  const formatTestsErrOutput = (tests) => tests
    .filter((test) => !test.pass && (test.exitStatus !== 0 || test.stderr !== ''))
    .map((test) => `\n\n** ${test.name} **\nExit status: ${test.exitStatus}\nOutput:\n-- START --\n${test.stderr}\n-- END --\n`)
    .join('\n\n');

  const formatTestsStdOutput = (tests) => tests
    .filter((test) => !test.pass)
    .map((test) => `\n\n** ${test.name} **\nOutput:\n-- START --\n${test.stdout}\n-- END --\n`)
    .join('\n\n');

  if (isLoading) {
    display = (
      <div>
        <Grid className={classes.loading} container justify='center'>
          <CircularProgress color='secondary' />
        </Grid>
      </div>
    );
  } else if (challenge !== null) {
    display = (
      <div>
        <Grid className={classes.gridRoot} container spacing={0}>
          <Grid item xs={12} sm={4}>
            <StatingDisplay
              title={challenge.name}
              stating={challenge.description}
            />
            <StdLog stdout={stdout} stderr={stderr} tests={testsList} />
            <Paper className={classes.paper} elevation={3}>
              <p style={{ textAlign: 'left' }}>
                Tests passed:
                {testsResult.passed}
              </p>
              <p style={{ textAlign: 'left' }}>
                Tests Failed:
                {testsResult.failed}
              </p>
            </Paper>
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
                try {
                  setIsSubmitting(true);
                  dispatch(showSnackbar('Challenge submitted, executing code...', 'info'));
                  const res = await submitCode(challenge.id, langsForSubmit[language], editValue);
                  if (res.compilation) {
                    setStderr(`${res.compilation.err}${formatTestsErrOutput(res.tests)}`);
                    setStdout(`${res.compilation.out}${formatTestsStdOutput(res.tests)}`);
                  }
                  setTestResult({ passed: res.passed, failed: res.failed });
                  setTestList(res.tests);
                  setIsSubmitting(false);
                  dispatch(clearSnackbar());
                  if (res.failed === 0) {
                    dispatch(showSnackbar('All tests passed !', 'success'));
                  } else {
                    dispatch(showSnackbar('You didnt pass all the tests :\'(', 'error'));
                  }
                } catch (e) {
                  setIsSubmitting(false);
                  dispatch(showSnackbar(e.response ? e.response.data.message : 'Fail to submit code'));
                }
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {display}
    </div>
  );
}
