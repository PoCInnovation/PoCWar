import React from 'react';
import { makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import BuildIcon from '@material-ui/icons/Build';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import ChallengeList from '../containers/ChallengeList';
import { createChallRoute, adminRoute } from '../consts/routes';
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
  const redirectAdmin = () => {
    history.push(adminRoute);
  };

  const fab = userIsAdmin() ? (
    <div style={{display: 'flex', flexDirection: 'row'}} className={classes.redirectCreateChallenge}>
      <Fab
        color='primary'
        aria-label='create'
        onClick={redirectCreateChall}
        style={{marginRight: 10}}
      >
        <CreateIcon />
      </Fab>
      <Fab
        color='primary'
        aria-label='admin'
        onClick={redirectAdmin}
      >
        <BuildIcon />
      </Fab>
    </div>
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
