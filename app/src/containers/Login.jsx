import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import theme from '../consts/themes';
import { homeRoute } from '../consts/routes';
import { signin } from '../hooks/auth';
import { showSnackbar } from '../reducers/actions/snackBarAction';

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
}));

const loginFormFields = [
  {
    id: 'email',
    label: 'Email Address',
    autoComplete: 'email',
    inputRef: {
      required: 'Email is required',
      minLength: 5,
      maxLength: 50,
    },
    autoFocus: true,
  },
  {
    id: 'password',
    label: 'Password',
    autoComplete: 'current-password',
    inputRef: {
      minLength: {
        value: 8,
        message: 'Should contain at least 8 characters',
      },
      maxLength: {
        value: 40,
        message: 'Should not exceed 40 character',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*.\-_])/,
        message: 'Should contains at least 1 digit, 1 lowercase, 1 uppercase and 1 special character',
      },
      autoFocus: false,
    },
  },
];

const SignInContainer = withRouter(({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles(theme);
  const dispatch = useDispatch();


  async function onSignIn({ email, password }) {
    return signin(email, password)
      .then(() => {
        history.push(homeRoute);
      })
      .catch((err) => {
        dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to log in.'));
      });
  }

  useEffect(() => {
    if (errors.email) {
      dispatch(showSnackbar(errors.email.message));
    } else if (errors.password) {
      dispatch(showSnackbar(errors.password.message));
    }
  }, [errors]);

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSignIn)} className={classes.container}>
          {loginFormFields.map(({
            id, label, autoComplete, inputRef, autoFocus,
          }) => (
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              key={id}
              id={id}
              type={id}
              label={label}
              name={id}
              autoComplete={autoComplete}
              inputRef={register(inputRef)}
              autoFocus={autoFocus}
              InputProps={{
                className: classes.input,
              }}
              error={!!errors[id]}
            />
          ))}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
});

export default SignInContainer;
