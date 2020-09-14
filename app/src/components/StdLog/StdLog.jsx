import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import theme from '../../consts/themes';

function TabPanel({
  children, value, index, ...other
}) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '2%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    overflow: 'hidden',
  },
  textBlock: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 300,
    fontSize: 18,
  },
}));

export default function StdLog({ stdout, stderr }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const formatStdout = stdout.split('\n').map((item, i) => (<p key={i}>{item}</p>));
  const formatStderr = stderr.split('\n').map((item, i) => (<p key={i}>{item}</p>));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='Output of program'>
          <Tab label='stdout' {...a11yProps(0)} />
          <Tab label='stderr' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{ height: 170, overflowY: 'scroll' }}>
        <Box className={classes.textBlock} color='text.primary'>
          <Typography component='div' variant='body2' style={{ marginLeft: 10 }}>
            {formatStdout}
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} style={{ height: 170, overflowY: 'scroll' }}>
        <Box className={classes.textBlock} color='text.accent' style={{ marginLeft: 10 }}>
          <Typography component='div' variant='body2'>
            {formatStderr}
          </Typography>
        </Box>
      </TabPanel>
    </Paper>
  );
}
