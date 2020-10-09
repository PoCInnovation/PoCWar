import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Fab from '@material-ui/core/Fab';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { showSnackbar } from '../../reducers/actions/snackBarAction';
import { editChallRoute, createChallRoute } from '../../consts/routes';
import { http, getHeaders } from '../../utils/server';

const useStyles = makeStyles((theme) => ({
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  confirmTitle: {
    color: theme.palette.secondary.dark,
  },
}));

const Fade = React.forwardRef((props, ref) => {
  const {
    in: open, children, onEnter, onExited, ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function TablePaginationActions(props, history) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon color='secondary' /> : <FirstPageIcon color='secondary' />}
      </IconButton>
      <IconButton
        color='primary'
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight color='secondary' /> : <KeyboardArrowLeft color='secondary' />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft color='secondary' /> : <KeyboardArrowRight color='secondary' />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon color='secondary' /> : <LastPageIcon color='secondary' />}
      </IconButton>
      <IconButton
        color='primary'
        aria-label='create'
        onClick={() => history.push(createChallRoute)}
      >
        <AddCircleIcon color='secondary' />
      </IconButton>
    </div>
  );
}

export default function AdminChallsTable({ history }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [gridData, setGridData] = useState({
    columns: [
      { title: 'Edit', field: 'edit' },
      { title: 'Name', field: 'name' },
      { title: 'Category', field: 'category' },
      { title: 'Author', field: 'author', editable: 'never' },
    ],
    data: [],
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.secondary.dark,
    },
    body: {
      fontSize: 20,
      //
    },
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#1A1C23',
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#272A35',
      },
    },
  }))(TableRow);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      await http.get(`/challenge?page=${page + 1}&pageSize=${rowsPerPage}`, getHeaders())
        .then((res) => {
          setGridData(g => {return {
            ...g,
            data: res.data.challenges.map(({ author, ...challenge }) => ({
              ...challenge,
              author: author.name,
            })),
            pageCount: res.data.pageCount,
          }});
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, [page, rowsPerPage]);

  const deleteChallenge = (slug) => {
    http.delete(`/challenge/${slug}`, getHeaders()).then(() => {
      dispatch(showSnackbar('Challenge successfully deleted.', 'success'));
      setPage(1);
      setPage(0);
    }).catch((err) => {
      console.log(err);
      dispatch(showSnackbar('An error occured :/, might try again later', 'error'));
    });
  };

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Edit</StyledTableCell>
            <StyledTableCell align='left'>Name</StyledTableCell>
            <StyledTableCell align='right'>Author</StyledTableCell>
            <StyledTableCell align='right'>Slug</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridData.data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align='center' style={{ width: 150 }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Fab
                    color='primary'
                    aria-label='create'
                    onClick={() => history.push(`${editChallRoute}?challengeSlug=${row.slug}`)}
                  >
                    <CreateIcon />
                  </Fab>
                  <Fab
                    color='primary'
                    aria-label='create'
                    onClick={() => {
                      setConfirmOpen(row.slug);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Fab>
                  <Modal
                    aria-labelledby='spring-modal-title'
                    aria-describedby='spring-modal-description'
                    className={classes.modal}
                    open={confirmOpen === row.slug}
                    onClose={() => {
                      setConfirmOpen(undefined);
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={row.slug === confirmOpen}>
                      <div className={classes.paper}>
                        <h2 className={classes.confirmTitle}>
                          Are you sure you want to delete
                          {row.slug}
                          {' '}
                          ?
                        </h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant='contained' color='secondary' onClick={() => setConfirmOpen(undefined)}>
                            Ooops...
                          </Button>
                          <Button
                            variant='contained'
                            color='primary'
                            style={{ minWidth: 210 }}
                            align='right'
                            onClick={() => {
                              setConfirmOpen(undefined);
                              deleteChallenge(row.slug);
                            }}
                          >
                            I know what i&apos;m doing !
                          </Button>
                        </div>
                      </div>
                    </Fade>
                  </Modal>
                </div>
              </StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.author}</StyledTableCell>
              <StyledTableCell align='right'>{row.slug}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              className={classes.footer}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={gridData.columns.length}
              count={gridData.pageCount * rowsPerPage}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={(props) => TablePaginationActions(props, history)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
