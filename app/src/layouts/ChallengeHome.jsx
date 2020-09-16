import React from 'react';
import { makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import ChallengeList from '../containers/ChallengeList';
import { createChallRoute } from '../consts/routes';
import { userIsAdmin } from '../utils/auth';

const useStyles = makeStyles(() => ({
  challengesList: {
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '2%',
  },
  redirectCreateChallenge: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
  },
}));

const ChallengeHome = withRouter(({ history }) => {
  const classes = useStyles();
  const redirectCreateChall = () => {
    history.push(createChallRoute);
  };

  const fab = userIsAdmin() ? (
    <Fab
      color='primary'
      aria-label='create'
      onClick={redirectCreateChall}
      className={classes.redirectCreateChallenge}
    >
      <CreateIcon />
    </Fab>
  ) : '';
  return (
    <div>
      <div className={classes.challengesList}>
        <ChallengeList />
      </div>
      {fab}
    </div>
  );
});

export default ChallengeHome;
