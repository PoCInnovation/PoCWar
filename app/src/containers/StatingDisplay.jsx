import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography, Paper } from '@material-ui/core';
import defaultTheme from '../consts/themes';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  textBlock: {
    paddingLeft: '6%',
    paddingRight: '1%',
    display: 'block',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 300,
    fontSize: 18,
  },
  titleBlock: {
    paddingTop: '3%',
    paddingLeft: '3%',
    component: 'div',
    display: 'block',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'justify',
    fontWeight: 400,
  },
  paperBlock: {
    margin: '2%',
    background: theme.palette.primary.main,
    overflow: 'auto',
  },
  inputPaper: {
    paddingTop: '5px',
    paddingBottom: '2px',
    margin: '2%',
    background: theme.palette.primary.light,
  },
}));

export default function StatingDisplay({
  title, stating, inputExample, outputExample,
}) {
  const classes = useStyles(defaultTheme);
  const formattedStating = stating.split('\n').map((item, i) => <p key={i}>{item}</p>);
  const formattedInputExample = inputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);
  const formattedOutputExample = outputExample.split('\n').map((item, i) => <p key={i}>{item}</p>);

  return (
    <div className={classes.root}>
      <Paper className={classes.paperBlock}>
        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            {title}
          </Typography>
        </Box>
        <Box className={classes.textBlock} color='text.secondary'>
          <Typography align='left' component='span' variant='body2'>
            {formattedStating}
          </Typography>
        </Box>

        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            Input example
          </Typography>
        </Box>
        <Paper className={classes.inputPaper}>
          <Box className={classes.textBlock} color='text.secondary'>
            <Typography align='left' component='span' variant='body2'>
              {formattedInputExample}
            </Typography>
          </Box>
        </Paper>

        <Box className={classes.titleBlock} color='text.primary'>
          <Typography align='justify' component='h1' variant='h5'>
            Expected output
          </Typography>
        </Box>
        <Paper className={classes.inputPaper}>
          <Box className={classes.textBlock} color='text.secondary'>
            <Typography align='left' component='span' variant='body2'>
              {formattedOutputExample}
            </Typography>
          </Box>
        </Paper>
      </Paper>
    </div>
  );
}
