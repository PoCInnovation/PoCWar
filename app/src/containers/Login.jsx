import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import theme from '../consts/themes';
import { homeRoute } from '../consts/routes';
import { signin } from '../hooks/auth';

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
    textTransform: 'none',
  },
  googleSignin: {
    height: '40px',
    paddingLeft: '8px',
    paddingRight: '8px',
    color: '#000000',
  },
  googleLogo: {
    maxWidth: '18px',
    maxHeight: '18px',
    marginRight: '24px',
    float: 'left',
  },
  googleSigninText: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    color: '#757575',
    fontWeight: 500,
    textTransform: 'none',
  },
}));

export async function onSignin(history, signinMethod, params = {}) {
  return signinMethod(...(Object.values(params)))
    .then(() => {
      history.push(homeRoute);
    })
    .catch((err) => {
      console.error(err);
      alert(`invalid signin: ${err.message} [${err.code}]`);
    });
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
            className: classes.input,
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
            className: classes.input,
          }}
        />
        <SigninButton />
      </Paper>
    </Container>
  );
}
