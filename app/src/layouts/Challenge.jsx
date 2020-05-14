import React from 'react';
import NavBar from '../containers/NavBar';
import Editor from '../components/Editor/Editor';
import StatingDisplay from '../containers/StatingDisplay';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const loreipsum = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
const inputExample = '1 2 3';
const outputExample = '2 4 6';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    position: 'relative',
  },
}));

export default function ChallengeLayout({ user }) {
  const classes = useStyles();

  return (
    <div>
      <NavBar user={user} />
      <Grid className={classes.gridRoot} container spacing={0}>
        <Grid item xs={12} sm={4}>
          <StatingDisplay inputExample={inputExample} outputExample={outputExample} stating={loreipsum}/>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Editor language='python' theme='xcode' />
        </Grid>
      </Grid>
    </div>
  );
}
