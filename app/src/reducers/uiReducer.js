const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SNACKBAR_OPEN':
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarSeverity: action.severity,
      };
    case 'SNACKBAR_CLEAR':
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
