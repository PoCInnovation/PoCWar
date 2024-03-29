import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { homeRoute } from '../consts/routes';
import { signin } from '../hooks/auth';
import { showSnackbar } from '../reducers/actions/snackBarAction';
import FormContainer from './Form';

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
    type: 'password',
    inputRef: {
      minLength: {
        value: 4,
        message: 'Should contain at least 4 characters',
      },
      maxLength: {
        value: 40,
        message: 'Should not exceed 40 character',
      },
      autoFocus: false,
    },
  },
];

const SignInContainer = withRouter(({ history }) => {
  const dispatch = useDispatch();

  async function onSignIn({ email, password }) {
    return signin(email, password)
      .then(() => {
        history.push(homeRoute);
        // TODO: deprecated
        window.location.reload(false);
      })
      .catch((err) => {
        dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to log in.'));
      });
  }

  return (
    <FormContainer formFields={loginFormFields} onSubmit={onSignIn} />
  );
});

export default SignInContainer;
