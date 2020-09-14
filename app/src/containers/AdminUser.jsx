import React from 'react';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getHeaders, http } from '../utils/server';
import { showSnackbar } from '../reducers/actions/snackBarAction';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function AdminUserTable() {
  const dispatch = useDispatch();
  const columns = [
    { title: 'Email', field: 'email' },
    { title: 'Name', field: 'name' },
    {
      title: 'Role',
      field: 'role',
      lookup: { admin: 'Admin', user: 'User' },
    },
  ];
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([
    { name: 'default', surname: 'default', role: 'user' },
  ]);

  http.get('/admin/users?page=1&pageSize=100', getHeaders())
    .then((res) => {
      setIsLoading(false);
      setRows(res.data);
    })
    .catch((e) => {
      dispatch(showSnackbar(e.response ? e.response.message : 'failed to fetch users'));
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
    <div className={useStyles.main}>
      <MaterialTable
        title='Users'
        columns={columns}
        data={rows}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setRows((prevState) => prevState.concat(newData));
            }, 600);
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setRows((prevState) => {
                  const data = [...prevState];
                  data[data.indexOf(oldData)] = newData;
                  return data;
                });
              }
            }, 600);
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setRows((prevState) => {
                const data = [...prevState];
                data.splice(data.indexOf(oldData), 1);
                return data;
              });
            }, 600);
          }),
        }}
      />
    </div>
  );
}
