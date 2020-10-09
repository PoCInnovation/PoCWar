import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { homeRoute } from '../consts/routes';
import { register } from '../hooks/auth';
import { showSnackbar } from '../reducers/actions/snackBarAction';
import FormContainer from './Form';

const registerFormFields = [
  {
    id: 'email',
    label: 'Email Address',
    autoComplete: 'email',
    inputRef: {
      required: 'Email is required',
      minLength: {
        value: 5,
        message: 'Should contain at least 5 characters',
      },
      maxLength: {
        value: 50,
        message: 'Should not exceed 50 character',
      },
    },
    autoFocus: true,
  },
  {
    id: 'name',
    label: 'Name',
    autoComplete: 'name',
    inputRef: {
      required: 'name is required',
      minLength: {
        value: 4,
        message: 'Should contain at least 4 characters',
      },
      maxLength: {
        value: 30,
        message: 'Should not exceed 30 character',
      },
    },
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
    inputRef: {
      minLength: {
        value: 4,
        message: 'Should contain at least 8 characters',
      },
      maxLength: {
        value: 40,
        message: 'Should not exceed 40 character',
      },
    },
  },
  {
    id: 'confirmPassword',
    label: 'ConfirmPassword',
    type: 'password',
    autoComplete: 'confirm-password',
    inputRef: {
      minLength: {
        value: 4,
        message: 'Should contain at least 8 characters',
      },
      maxLength: {
        value: 40,
        message: 'Should not exceed 40 character',
      },
    },
  },
];

const SignInContainer = withRouter(({ history }) => {
  const dispatch = useDispatch();

  async function onRegister({
    email, password, confirmPassword, name,
  }) {
    if (password !== confirmPassword) {
      dispatch(showSnackbar('The password and confirmation password do not match'));
      return;
    }
    await register(email, password, name)
      .then(() => {
        history.push(homeRoute);
        window.location.reload(false);
      })
      .catch((err) => {
        dispatch(showSnackbar(err.response ? err.response.data.message : 'Failed to register.'));
      });
  }

  return (
    <FormContainer formFields={registerFormFields} onSubmit={onRegister} />
  );
});

export default SignInContainer;
