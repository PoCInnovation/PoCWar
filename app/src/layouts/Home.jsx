import React from "react";
// import { Button, Grid } from "@material-ui/core";
import ChallengeList from '../containers/ChallengeList'
// import { useHistory } from "react-router-dom";
import NavBar from "../containers/NavBar";
import { makeStyles } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import { createChallRoute } from '../consts/routes'
import Fab from '@material-ui/core/Fab';
// import { editorRoute } from "../consts/routes";

const useStyles = makeStyles(() => ({
  challengesList: {
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '2%',
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const redirectCreateChall = () => {
    history.push(createChallRoute);
  };

  return (
    <div>
      <NavBar />
      <div className={classes.challengesList}>
        <ChallengeList />
      </div>
      <Fab color="primary" aria-label="create" onClick={redirectCreateChall} style={{position: 'absolute', bottom: '15px', right: '15px'}}>
        <CreateIcon />
      </Fab>
    </div>
  );
}
