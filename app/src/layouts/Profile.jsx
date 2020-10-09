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
import { LogoutButton } from '../components/LogButtons';
import { getHeaders, http } from '../utils/server';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../reducers/actions/snackBarAction';
import { loginRoute } from '../consts/routes';

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
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfile] = useState({});
  const [isEditing, setEditing] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const user = {
    error, profileData, isLoading,
  };
  const onSubmit = ({username, mail}) => {
    setIsLoading(true);
    http.patch('/profile', { name:username, email:mail }, getHeaders())
      .then((res) => {
        console.log(res);
        setProfile({email: res.data.email, name: res.data.name, role: user.profileData.role, challenges: user.profileData.challenges});
        console.log(user.profileData);
        setIsLoading(false);
        setEditing(false);
        dispatch(showSnackbar('Profile successfully updated.', 'success'));
        Cookies.remove('user');
        history.push(loginRoute);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showSnackbar('Failed to update your profile.', 'error'));
      });
  }
  const onSubmitError = (localErrors) => {
    Object.values(localErrors).some((value) => {
      if (value.message) {
        dispatch(showSnackbar(value.message));
        return true;
      }
      return false;
    });
  };
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
  if (user.isLoading) {
    profile = <CircularProgress color='secondary' />;
  } else {
    profile = (
      <div style={{ width: 500 }}>
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Paper className={classes.paper} elevation={3}>
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
                          name="username"
                          required
                          InputProps={{
                            className: classes.input,
                          }}
                          defaultValue={user.profileData.name}
                          inputRef={register({
                            required: true,
                            minLength: {
                              value: 3,
                              message: 'Should contain at least 3 characters',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Should not exceed 50 character',
                            },
                          })}
                          error={!!errors.username}
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
                          name="mail"
                          InputProps={{
                            className: classes.input,
                          }}
                          required
                          defaultValue={user.profileData.email}
                          inputRef={register({
                            required: true,
                            pattern: {
                              value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}\b/,
                              message: 'You must enter a valid email.'
                            },
                            maxLength: {
                              value: 50,
                              message: 'Should not exceed 50 character',
                            },
                        })}
                        error={!!errors.mail}
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
                    style={{ marginRight: 10 }}
                    size='small'
                    type='submit'
                  >
                    <CheckIcon />
                  </Fab>
                  <Fab
                    color='primary'
                    aria-label='create'
                    style={{}}
                    size='small'
                    onClick={() => { setEditing(!isEditing); }}
                  >
                    <CloseIcon />
                  </Fab>
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
        </form>
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
