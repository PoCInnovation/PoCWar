import React from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import adminGetUsers from '../hooks/admin';
import useChallenges from '../hooks/challenges'
import { showSnackbar } from '../reducers/actions/snackBarAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark,
  },
  rows: {
    background: '#272A35',
    borderColor: 'gray',
  },
  head: {
    background: '#272A35',
    borderColor: 'gray',
    color: 'white',
    fontStyle: 'bold'
  },
  table: {
    minWidth: 650,
  },
}));

export function AdminUserTable() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const rows = adminGetUsers('1');
  if (rows.isLoading) {
    return (
      <div>
        <Grid container justify='center'>
          <CircularProgress color='secondary' />
        </Grid>
      </div>
    );
  }
  console.log(rows);
  return (
    <div className={classes.main}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}></TableCell>
              <TableCell className={classes.head}>Email</TableCell>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.data.users.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell className={classes.rows}>{index+1}</TableCell>
                <TableCell className={classes.rows}>{row.email}</TableCell>
                <TableCell className={classes.rows}>{row.name}</TableCell>
                <TableCell className={classes.rows}>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export function AdminChallsTable() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const rows = useChallenges('1');
  if (rows.isLoading) {
    return (
      <div>
        <Grid container justify='center'>
          <CircularProgress color='secondary' />
        </Grid>
      </div>
    );
  }
  return (
    <div className={classes.main}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Index</TableCell>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Category</TableCell>
              <TableCell className={classes.head}>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.challengesList?.challenges.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell className={classes.rows}>{index+1}</TableCell>
                <TableCell className={classes.rows}>{row.name}</TableCell>
                <TableCell className={classes.rows}>{row.category}</TableCell>
                <TableCell className={classes.rows}>{row.author.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
