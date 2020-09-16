export const showSnackbar = (message, severity = 'error') => ({ type: 'SNACKBAR_OPEN', message, severity });

export const clearSnackbar = () => ({ type: 'SNACKBAR_CLEAR' });
