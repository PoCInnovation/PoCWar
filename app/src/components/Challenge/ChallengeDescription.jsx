import React from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import theme from '../../consts/themes';
import { editorRoute } from '../../consts/routes';

const challHeight = 60;

const useStyles = makeStyles(() => ({
  challengeNotDone: {
    height: challHeight,
    marginBottom: '2%',
    background: theme.palette.primary.main,
    cursor: 'pointer',
    alignItems: 'center',
  },
  challengeDone: {
    height: challHeight,
    marginBottom: '2%',
    background: '#145A32',
    cursor: 'pointer',
    alignItems: 'center',
  },
  title: {
    float: 'left',
    marginLeft: '5%',
  },
  category: {
    float: 'right',
    marginRight: '5%',
  },
}));

export default function ChallengeDescription({
  title, category, slug, validated,
}) {
  const classes = useStyles();
  const history = useHistory();

  const challengeOnClick = () => {
    history.push({
      pathname: editorRoute,
      search: `?challengeID=${slug}`,
    });
  };

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs={12}>
        <Paper
          className={validated ? classes.challengeDone : classes.challengeNotDone}
          onClick={challengeOnClick}
          style={{
          }}
        >
          <span
            className={classes.title}
            style={{
              paddingTop: challHeight/2-10
            }}
          >
            {title}
          </span>
          <span
            className={classes.category}
            style={{
              paddingTop: challHeight/2-10
            }}
          >
            {category}
          </span>
        </Paper>
      </Grid>
    </Grid>
  );
}
