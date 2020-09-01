import React from 'react';
import { makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { createChallRoute } from '../consts/routes';
import ChallengeList from '../containers/ChallengeList';

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

const Home = withRouter(({ history }) => {
  const classes = useStyles();
  const redirectCreateChall = () => {
    history.push(createChallRoute);
  };

  return (
    <div>
      <div className={classes.challengesList}>
        <ChallengeList />
      </div>
      <Fab
        color='primary'
        aria-label='create'
        onClick={redirectCreateChall}
        className={classes.redirectCreateChallenge}
      >
        <CreateIcon />
      </Fab>
    </div>
  );
});

export default Home;
