import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography, Paper } from '@material-ui/core';
import theme from '../consts/themes';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  textBlock: {
    paddingLeft: '6%',
    paddingRight: '6%',
    component: 'div',
    display: 'block',
    font: 'Roboto',
    fontSize: '18',
  },
  titleBlock: {
    paddingTop: '3%',
    paddingLeft: '3%',
    component: 'div',
    display: 'block',
    font: 'Oxygen',
  },
  paperBlock: {
    margin: '2%',
    height: '600px',
    background: theme.palette.primary.main,
    overflow: 'auto',
  }
}));

export default function StatingDisplay({ title, stating, inputExample, outputExample }) {
  const classes = useStyles();
  stating = stating.split('\n').map((item, i) => <p key={i}>{item}</p>);
  inputExample = inputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);
  outputExample = outputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);

  return (
    <div className={classes.root}>
      <Paper className={classes.paperBlock}>
        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            {title}
          </Typography>
        </Box>
        <Box className={classes.textBlock} color='text.secondary'>
          <Typography align='left'>
            {stating}
          </Typography>
        </Box>

        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            Input example
        </Typography>
        </Box>
        <Box className={classes.textBlock} color='text.secondary'>
          <Typography align='left'>
            {inputExample}
          </Typography>
        </Box>

        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            Expected output
        </Typography>
        </Box>
        <Box className={classes.textBlock} color='text.secondary'>
          <Typography align='left'>
            {outputExample}
          </Typography>

        </Box>
      </Paper>
    </div>
  );
}
