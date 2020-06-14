import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from '../../consts/themes';
import { Paper } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    height: '190px',
    overflow: 'auto',
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

  stdout = stdout.split('\n').map((item, i) => <p key={i}>{item}</p>);
  stderr = stderr.split('\n').map((item, i) => <p key={i}>{item}</p>);

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
      <TabPanel value={value} index={0}>
        <Box className={classes.textBlock} color='text.primary'>
          <Typography component={'span'} variant={'body2'}>
            {stdout}
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className={classes.textBlock} color='text.accent'>
          <Typography component={'span'} variant={'body2'}>
            {stderr}
          </Typography>
        </Box>
      </TabPanel>
    </Paper>
  );
}
