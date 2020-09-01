import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { clearSnackbar } from '../reducers/actions/snackBarAction';

export default function SuccessSnackbar() {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen, snackbarSeverity } = useSelector(
    (state) => state.ui,
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <MuiAlert onClick={handleClose} elevation={6} variant='filled' severity={snackbarSeverity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
}
