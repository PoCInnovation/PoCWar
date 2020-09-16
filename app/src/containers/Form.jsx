import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import defaultTheme from '../consts/themes';
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

const FormContainer = ({ formFields, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles(defaultTheme);
  const dispatch = useDispatch();

  const onSubmitError = () => {
    Object.values(errors).some((value) => {
      if (value.message) {
        dispatch(showSnackbar(value.message));
        return true;
      }
      return false;
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)} className={classes.container}>
          {formFields.map(({
            id, label, autoComplete, inputRef, autoFocus, type,
          }) => (
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              key={id}
              id={id}
              type={type}
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
};

export default FormContainer;
