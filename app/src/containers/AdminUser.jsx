import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';
import { showSnackbar } from '../reducers/actions/snackBarAction';
import useChallenges from '../hooks/challenges';
import { useAdminGetUsers, useAdminDeleteUsers } from '../hooks/admin';
import { http, getHeaders } from '../utils/server';
import {getUserFromCookie} from "../utils/auth";

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
    fontStyle: 'bold',
  },
  table: {
    minWidth: 650,
  },
}));

export function AdminUserTable() {
  const user = getUserFromCookie();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [gridData, setGridData] = useState({
    columns: [
      { title: 'Email', field: 'email', editable: 'never' },
      { title: 'Name', field: 'name', editable: 'never' },
      { title: 'Role', field: 'role', lookup: { admin: 'Admin', user: 'User' } },
    ],
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      await http.get(`/admin/users?page=${page}&pageSize=100`, getHeaders())
        .then((res) => {
          console.log(user.id, res.data)
          const users = user ? res.data.users.filter(u => u.id !== user.id) : res.data.users;
          setGridData({ ...gridData, data: users });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [page]);

  // const onRowAdd = (newData) => new Promise((resolve) => {});

  const onRowUpdate = (newData, oldData) => new Promise((resolve) => {
    http.patch(`/admin/users/${newData.id}`, {role: newData.role }, getHeaders())
      .then(() => {
        const data = [...gridData.data];
        data[data.indexOf(oldData)] = newData;
        setGridData({ ...gridData, data });
      })
      .catch(() => {
        dispatch(showSnackbar('failed to update user'));
      })
      .finally(() => resolve());
  });

  const onRowDelete = (oldData) => new Promise((resolve) => {
    http.delete(`/admin/users/${oldData.id}`, getHeaders())
      .then(() => {
        const data = [...gridData.data];
        const index = data.indexOf(oldData);
        data.splice(index, 1);
        setGridData({ ...gridData, data });
      })
      .catch(() => {
        dispatch(showSnackbar('failed to update user'));
      })
      .finally(() => resolve());
  });

  if (isLoading) {
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <MaterialTable
        title='Users'
        columns={gridData.columns}
        data={gridData.data}
        style={{backgroundColor: '#272A35'}}
        options={{
          headerStyle: {backgroundColor: '#272A35'}
        }}
        editable={{
          onRowUpdate,
          onRowDelete,
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
