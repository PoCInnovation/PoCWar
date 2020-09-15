import React from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAdminGetUsers, useAdminDeleteUsers } from '../hooks/admin';
import useChallenges from '../hooks/challenges'
import { showSnackbar } from '../reducers/actions/snackBarAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';
import { http, getHeaders } from '../utils/server';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark,
  },
  rows: {
    background: '',
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
  const [state, setState] = React.useState({
    columns: [
      { title: 'Email', field: 'email' },
      { title: 'Name', field: 'name' },
      { title: 'Role', field: 'role' },
    ],
    data: [],
  });
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const rows = useAdminGetUsers('1');
  if (rows.isLoading) {
    return (
      <div>
        <Grid container justify='center'>
          <CircularProgress color='secondary' />
        </Grid>
      </div>
    );
  }
  state.data = rows.data.users;
  console.log('users:',rows.data.users)
  return (
    <div className={classes.main}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title="List of users"
        columns={state.columns}
        data={state.data}
        style={{backgroundColor: '#272A35'}}
        components={{
          Column: props => (
              <div style={{ backgroundColor: '#e8eaf5' }}>
                  hello
              </div>
          )
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  http.delete(`/admin/users/${oldData.tableData.id}`, getHeaders());
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
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
              <TableCell className={classes.head}></TableCell>
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
