import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    marginTop: '4%',
  },
  textBlock: {
    margin: '4%',
    component: 'div',
    display: 'block',
    font: 'Roboto',
    fontSize: '18',
  },
  titleBlock: {
    marginLeft: '2%',
    component: 'div',
    display: 'block',
    font: 'Oxygen',
  }
}));

export default function StatingDisplay({ stating, inputExample, outputExample }) {
  const classes = useStyles();
  stating = stating.split('\n').map((item, i) => <p key={i}>{item}</p>);
  inputExample = inputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);
  outputExample = outputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);

  return (
    <div className={classes.root}>
      <Box className={classes.titleBlock} color='primary.main'>
        <Typography align='justify' component='h1' variant='h5'>
          Stating
        </Typography>
      </Box>
      <Box className={classes.textBlock} color='text.secondary'>
        <Typography align='left'>
          {stating}
        </Typography>
      </Box>

      <Box className={classes.titleBlock} color='primary.main'>
        <Typography align='justify' component='h1' variant='h5'>
          Input example
        </Typography>
      </Box>
      <Box className={classes.textBlock} color='text.secondary'>
        {inputExample}
      </Box>

      <Box className={classes.titleBlock} color='primary.main'>
        <Typography align='justify' component='h1' variant='h5'>
          Expected output
        </Typography>
      </Box>
      <Box className={classes.textBlock} color='text.secondary'>
        {outputExample}
      </Box>
    </div>
  );
}
