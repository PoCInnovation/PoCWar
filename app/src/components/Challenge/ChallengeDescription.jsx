import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import theme from '../../consts/themes';
import { useHistory } from 'react-router-dom';
import { editorRoute } from '../../consts/routes';

const useStyles = makeStyles(() => ({
  challenge: {
    height: '60px',
    marginBottom: '2%',
    background: theme.palette.primary.main,
    cursor: 'pointer',
    alignItems: 'center',
  },
  title: {
    float: 'left',
    marginLeft: '1%',
  },
  category: {
    float: 'right',
    marginRight: '1%',
  }
}));

function challengeOnClick(history, slug) {
  history.push({
    pathname: editorRoute,
    search: `?challengeID=${slug}`,
  });
}

export default function ChallengeDescription({ title, category, slug }) {
  const classes = useStyles();
  let history = useHistory();
  const onClick = () => { challengeOnClick(history, slug) };

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs={12}>
        <Paper className={classes.challenge} onClick={onClick}>
          <p className={classes.title}>{title}</p>
          <p className={classes.category}>{category}</p>
      </Paper>
      </Grid>
    </Grid>
  );
}