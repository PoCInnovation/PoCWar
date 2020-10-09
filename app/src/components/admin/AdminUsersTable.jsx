import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { showSnackbar } from '../../reducers/actions/snackBarAction';
import useChallenges from '../../hooks/challenges';
import { useAdminGetUsers, useAdminDeleteUsers } from '../../hooks/admin';
import { http, getHeaders } from '../../utils/server';
import { getUserFromCookie } from '../../utils/auth';

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
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  footer: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export function AdminUserTable() {
  const user = getUserFromCookie();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
          console.log(user.id, res.data);
          const users = user ? res.data.users.filter((u) => u.id !== user.id) : res.data.users;
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
    http.patch(`/admin/users/${newData.id}`, { role: newData.role }, getHeaders())
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
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      <MaterialTable
        title='Users'
        columns={gridData.columns}
        data={gridData.data}
        rowsPerPage={rowsPerPage}
        style={{ backgroundColor: '#272A35' }}
        options={{
          headerStyle: { backgroundColor: '#272A35' },
        }}
        editable={{
          onRowUpdate,
          onRowDelete,
        }}
      />
    </div>
  );
}
