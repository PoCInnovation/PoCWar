import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AdminUserTable, AdminChallsTable } from '../containers/AdminUser';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
}));

export default function AdminLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.main}>
      <AppBar position='static'>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='nav tabs example'
        >
          <Tab label='Users' {...a11yProps(0)} />
          <Tab label='Challenges' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <AdminUserTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminChallsTable />
      </TabPanel>
    </div>
  );
}
