import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import useProfile from '../hooks/profile';
import { Grid } from '@material-ui/core';
import { LogoutButton } from '../components/LogButtons'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: theme.palette.primary.A100,
    marginTop: '5%',
    marginBottom: '5%',
  },
}));

function challengeSolved(challs) {
  if (!challs) {
    return 0;
  }
  let count = 0;
  challs.map((chall) => count+=chall.solved);
  return (count)
}

const Profile = withRouter(({ history }) => {
  const user = useProfile();
  const classes = useStyles();
  let profile = undefined;
  console.log('user:', user);
  if (user.isLoading) {
    profile = <CircularProgress color='secondary' />
  } else  {
    profile = (
      <div>
        <div style={{display: 'flex', justifyContent:'center'}}>
          <Paper className={classes.paper} elevation={3}>
            <ul style={{float:'left', color: 'black', textAlign: 'left', listStyleType: 'none'}}>
              <li>Name</li>
              <li>Email</li>
              <li>Role</li>
              <li>Challenges solved</li>
              <li>Challenges started</li>
            </ul>
            <ul style={{float:'right', color: 'black', textAlign: 'right', listStyleType: 'none', paddingRight: 20, fontWeight: 'bold'}}>
              <li>{user.profile?.name}</li>
              <li>{user.profile?.email}</li>
              <li>{user.profile?.role}</li>
              <li>{challengeSolved(user.profile?.challenges)}</li>
              <li>{user.profile?.challenges.length}</li>
            </ul>
          </Paper>
        </div>
        <LogoutButton email={'Disconnect'}/>
      </div>
    )
  }
  return (
    <Grid container justify='center'>
      {profile}
    </Grid>
  );
});

export default Profile;
