import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { LogoutButton } from '../components/LogButtons';
import useProfile from '../hooks/profile';
import { getHeaders, http } from '../utils/server';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: theme.palette.primary.A100,
    marginTop: '5%',
    marginBottom: '5%',
  },
}));

function challengeSolved(challenges) {
  if (!challenges) {
    return 0;
  }
  let count = 0;
  challenges.forEach((challenge) => {
    count += challenge.solved;
  });
  return (count);
}

const ProfileLayout = withRouter(({ history }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prof, setProfile] = useState({});
  const [isEditing, setEditing] = useState(false);

  const user = {
    error, prof, isLoading,
  };

  useEffect(() => {
    async function fetchData() {
      await http.get('/profile', getHeaders())
        .then((res) => {
          setProfile(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 401) {
            Cookies.remove('user');
            history.push('/login');
          }
          setError(true);
        });
    }
    fetchData();
  }, []);
  const classes = useStyles();
  let profile;
  if (user.error) {
    profile = <div>try reconnecting</div>;
  } else if (user.isLoading) {
    profile = <CircularProgress color='secondary' />;
  } else {
    profile = (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper className={classes.paper} elevation={3}>
            <ul style={{
              float: 'left', color: 'black', textAlign: 'left', listStyleType: 'none',
            }}
            >
              <li>Name</li>
              <li>Email</li>
              <li>Role</li>
              <li>Challenges solved</li>
              <li>Challenges started</li>
            </ul>
            <ul style={{
              float: 'right', color: 'black', textAlign: 'right', listStyleType: 'none', paddingRight: 20, fontWeight: 'bold',
            }}
            >
              {/* <li>{user.prof.name}</li> */}
              <li>{user.prof.email}</li>
              <li>{user.prof.role}</li>
              <li>{challengeSolved(user.prof.challenges)}</li>
              <li>{user.prof.challenges.length}</li>
            </ul>
          </Paper>
        </div>
        <LogoutButton email='Disconnect' />
        <Fab
          color='primary'
          aria-label='create'
          style={{float: 'right'}}
          size="small"
          onClick={() => {console.log('hello')}}
        >
          <CreateIcon />
        </Fab>
      </div>
    );
  }
  return (
    <Grid container justify='center'>
      {profile}
    </Grid>
  );
});

export default ProfileLayout;
