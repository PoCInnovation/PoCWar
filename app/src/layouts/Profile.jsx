import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { LogoutButton } from '../components/LogButtons';
import { getHeaders, http } from '../utils/server';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: theme.palette.primary.A100,
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  li: {
    display: 'flex',
    flexDirection: 'linum',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
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
  const [profileData, setProfile] = useState({});
  const [isEditing, setEditing] = useState(false);

  const user = {
    error, profileData, isLoading,
  };
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      await http.get('/profile', getHeaders())
        .then((res) => {
          setProfile(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            Cookies.remove('user');
            history.push('/login');
          }
          setError(true);
        });
    }
    fetchData();
  }, [history]);
  const classes = useStyles();
  let profile;
  if (user.error) {
    profile = '';
  } else if (user.isLoading) {
    profile = <CircularProgress color='secondary' />;
  } else {
    profile = (
      <div style={{ width: '25%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Paper className={classes.paper} elevation={3}>
            <form onSubmit={(onSubmit, onSubmitError) => { console.log(onSubmit, onSubmitError); }}>
              <ul style={{
                color: 'black', listStyleType: 'none', width: '80%',
              }}
              >
                <li className={classes.li}>
                  <p>Name</p>
                  {isEditing
                    ? (
                      <TextField
                        id='newName'
                        label='New name'
                        required
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    )
                    : <p>{user.profileData.name}</p>}
                </li>
                <li className={classes.li}>
                  <p>Email</p>
                  {isEditing
                    ? (
                      <TextField
                        id='newMail'
                        label='New mail'
                        required
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    )
                    : <p>{user.profileData.email}</p>}
                </li>
                <li className={classes.li}>
                  <p>Role</p>
                  <p>{user.profileData.role}</p>
                </li>
                <li className={classes.li}>
                  <p>Challenges solved</p>
                  <p>{challengeSolved(user.profileData.challenges)}</p>
                </li>
                <li className={classes.li}>
                  <p>Challenges started</p>
                  <p>{user.profileData.challenges.length}</p>
                </li>
              </ul>
            </form>
          </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LogoutButton email='Disconnect' />
          {isEditing
            ? (
              <div>
                <Fab
                  color='primary'
                  aria-label='create'
                  style={{ float: 'right' }}
                  size='small'
                  onClick={() => { setEditing(!isEditing); }}
                >
                  <CloseIcon />
                </Fab>
                <Button
                  color='primary'
                  aria-label='create'
                  style={{ float: 'right' }}
                  size='small'
                  type='submit'
                >
                  <CheckIcon />
                </Button>
              </div>
            )
            : (
              <Fab
                color='primary'
                aria-label='create'
                style={{ float: 'right' }}
                size='small'
                onClick={() => { setEditing(!isEditing); }}
              >
                <CreateIcon />
              </Fab>
            )}
        </div>
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
