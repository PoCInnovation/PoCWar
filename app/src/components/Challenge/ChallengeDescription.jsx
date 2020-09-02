import React from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import theme from '../../consts/themes';
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
        <Paper className={classes.challenge} onClick={challengeOnClick}>
          {validated ? (<DoneIcon />) : (<CloseIcon />)}
          <p className={classes.title}>
            {title}
          </p>
          <p className={classes.category}>{category}</p>
        </Paper>
      </Grid>
    </Grid>
  );
}
