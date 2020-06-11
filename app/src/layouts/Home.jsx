import React from "react";
// import { Button, Grid } from "@material-ui/core";
import ChallengeList from '../containers/ChallengeList'
// import { useHistory } from "react-router-dom";
import NavBar from "../containers/NavBar";
import { makeStyles } from "@material-ui/core";
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

  return (
    <div>
      <NavBar />
      <div className={classes.challengesList}>
        <ChallengeList />
      </div>
    </div>
  );
}
