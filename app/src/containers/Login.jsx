import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from '../consts/themes';
import { homeRoute } from "../consts/routes";
import { useHistory } from 'react-router-dom';
import { signin, signinGmail } from '../firebase/sign';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '50%',
    padding: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: theme.palette.primary.A100,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    color: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function onSignin(history, signinMethod, params = {}) {
  const err = await signinMethod(...(Object.values(params)));

  if (err === null) {
    history.push(homeRoute);
  } else {
    alert('invalid signin: ' + err.message + ' [' + err.code + ']');
  }
}

function SigninButton() {
  const history = useHistory();
  const classes = useStyles(theme);

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submit}
      onClick={async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await onSignin(history, signin, { email, password });
      }}
    >
      Sign In
    </Button>
  );
}

function GmailSigninButton() {
  const history = useHistory();
  const classes = useStyles(theme);

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submit}
      onClick={async () => {
        await onSignin(history, signinGmail);
      }}
    >
      Sign in with Gmail
    </Button>
  );
}

export default function SignInContainer() {
  const classes = useStyles(theme);

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          InputProps={{
            className: classes.input
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          InputProps={{
            className: classes.input
          }}
        />
        <SigninButton />
        <GmailSigninButton />
      </Paper>
    </Container>
  );
}
