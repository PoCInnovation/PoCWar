import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';
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
    minHeight: '90%',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  inputPaper: {
    paddingTop: '5px',
    paddingBottom: '2px',
    margin: '2%',
    background: theme.palette.primary.light,
  },
}));

export default function StatingDisplay({
  title, stating,
}) {
  const classes = useStyles(defaultTheme);
  const parseHtml = htmlParser({
    isValidNode: (node) => node.type !== 'script',
    processingInstructions: [/* ... */],
  });
  return (
    <div className={classes.root} style={{ height: 400, overflowY: 'auto' }}>
      <div className={classes.paperBlock}>
        <Box className={classes.textBlock} color='text.secondary'>
          <ReactMarkdown
            source={stating}
            escapeHtml={false}
            astPlugins={[parseHtml]}
          />
        </Box>
      </div>
    </div>
  );
}
